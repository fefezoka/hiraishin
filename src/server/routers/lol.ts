import { z } from 'zod';
import { procedure, router } from '../trpc';
import axios from '../../service/axios';
import { players } from '@/commons/lol-data';
import { getTotalLP } from '@/utils/league-of-legends/get-total-lp';

export const lolRouter = router({
  players: procedure.query(async () => {
    return await Promise.all<Player>(
      players.map(async (info) => {
        const { data: player } = await axios.get<SummonerDto>(
          `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${info.accountId}`
        );

        await new Promise((resolve) => setTimeout(resolve, 500));

        const { data: account } = await axios.get<AccountDto>(
          `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${player.puuid}`
        );

        await new Promise((resolve) => setTimeout(resolve, 500));

        const { data: leagues } = await axios.get<League[]>(
          `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.id}`
        );

        return {
          ...info,
          ...player,
          ...account,
          leagues: [
            leagues.find((league) => league.queueType === 'RANKED_SOLO_5x5'),
            leagues.find((league) => league.queueType === 'RANKED_FLEX_SR'),
          ].map((league) => {
            if (!league) {
              return null;
            }

            return {
              ...league,
              totalLP: getTotalLP(league),
            };
          }),
        };
      })
    ).then((players) => {
      const leagueRanking = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'].map(
        (_, index) =>
          players
            .filter((player) => player.leagues[index])
            .sort((a, b) => b.leagues[index]!.totalLP - a.leagues[index]!.totalLP!)
            .reduce(
              (acc, curr, idx) =>
                Object.assign(
                  acc,
                  (() => {
                    if (!curr.leagues[index]) {
                      return;
                    }
                    return { [curr.gameName]: idx + 1 };
                  })(),
                  {}
                ),
              {}
            ) as Record<string, number>
      );

      return players.map((player) => {
        return {
          ...player,
          leagues: player.leagues.map((league, index) => {
            if (!league) {
              return null;
            }

            return { ...league, index: leagueRanking[index][player.gameName] };
          }),
        };
      });
    });
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
