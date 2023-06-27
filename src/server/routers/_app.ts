import { z } from 'zod';
import { procedure, router } from '../trpc';
import axios from '../../service/axios';

export const appRouter = router({
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
