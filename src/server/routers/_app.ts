import { z } from 'zod';
import { procedure, router } from '../trpc';
import axios from '../../service/axios';
import { playersInfo, ranks, tiers } from '../../commons/data';

export const appRouter = router({
  players: procedure.query(async () => {
    return await Promise.all<Player>(
      playersInfo.map(async (info) => {
        const player = await axios
          .get(
            `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${info.name}`
          )
          .then((response) => response.data);

        const league = await axios
          .get(
            `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.id}`
          )
          .then((response: any) =>
            response.data.find((league: League) => league.queueType === 'RANKED_SOLO_5x5')
          );

        return { ...info, ...player, league };
      })
    ).then((response) =>
      response.sort((a, b) => {
        const higherElo =
          tiers.findIndex((tier) => tier.en === b.league.tier) -
          tiers.findIndex((tier) => tier.en === a.league.tier);

        const higherRank =
          ranks.findIndex((rank) => rank === b.league.rank) -
          ranks.findIndex((rank) => rank === a.league.rank);

        if (higherElo !== 0) {
          return higherElo;
        }

        if (higherRank !== 0) {
          return higherRank;
        }

        return b.league.leaguePoints - a.league.leaguePoints;
      })
    );
  }),
  matchHistory: procedure
    .input(
      z.object({
        puuid: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await axios
        .get<string[]>(
          `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${input.puuid}/ids?start=0&queue=420&count=5`
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
// export type definition of API
export type AppRouter = typeof appRouter;
