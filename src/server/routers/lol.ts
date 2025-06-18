import { z } from 'zod';
import { procedure, router } from '../trpc';
import axios from '../../service/axios';
import { players } from '@/commons/lol-data';
import { getTotalLP } from '@/utils/league-of-legends/get-total-lp';
import { setCookie } from 'cookies-next';

export const lolRouter = router({
  players: procedure.query(async ({ ctx }) => {
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const fetchPlayerData = async (info: (typeof players)[number]) => {
      const { data: player } = await axios.get<SummonerDto>(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${info.accountId}`
      );

      await delay(500);

      const { data: account } = await axios.get<AccountDto>(
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${player.puuid}`
      );

      await delay(500);

      const { data: leagues } = await axios.get<League[]>(
        `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.id}`
      );

      const rankedSolo =
        leagues.find((league) => league.queueType === 'RANKED_SOLO_5x5') || null;
      const rankedFlex =
        leagues.find((league) => league.queueType === 'RANKED_FLEX_SR') || null;

      return {
        ...info,
        ...player,
        ...account,
        leagues: [rankedSolo, rankedFlex].map((league) =>
          league
            ? {
                ...league,
                winrate: Math.round((league.wins / (league.wins + league.losses)) * 100),
                totalLP: getTotalLP(league),
              }
            : null
        ),
      };
    };

    const allPlayers = await Promise.all(players.map(fetchPlayerData));

    const recordLeagueRanking = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'].map(
      (queueType, index) => {
        const leagueRanking = allPlayers
          .filter((player) => player.leagues[index])
          .sort((a, b) => {
            const aLeague = a.leagues[index]!;
            const bLeague = b.leagues[index]!;

            return bLeague.totalLP - aLeague.totalLP || bLeague.winrate - aLeague.winrate;
          })
          .reduce<Record<string, any>>((acc, curr, i) => {
            const league = curr.leagues[index];

            if (!league) return acc;

            acc[curr.gameName] = {
              index: i + 1,
              elo: {
                tier: league.tier,
                rank: league.rank,
                leaguePoints: league.leaguePoints,
              },
            };

            return acc;
          }, {});

        setCookie(`hiraishin-${queueType}`, leagueRanking, {
          req: ctx.req,
          res: ctx.res,
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        return leagueRanking;
      }
    );

    return allPlayers.map((player) => ({
      ...player,
      leagues: player.leagues.map((league, index) =>
        league
          ? { ...league, index: recordLeagueRanking[index][player.gameName].index }
          : null
      ),
    }));
  }),
  matchHistory: procedure
    .input(
      z.object({
        puuid: z.string(),
        queue: z.enum(['420', '440']),
      })
    )
    .query(async ({ input }) => {
      return await axios
        .get<string[]>(
          `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${input.puuid}/ids?start=0&queue=${input.queue}&count=5`
        )
        .then(
          async (response) =>
            await Promise.all<Match>(
              response.data.map(
                async (matchId: string) =>
                  await axios
                    .get(
                      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`
                    )
                    .then((response) => {
                      return response.data;
                    })
              )
            )
        );
    }),
});
