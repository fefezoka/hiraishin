import { router } from '../trpc';
import { lolRouter } from './lol';
import { fifaRouter } from './sheets-fifa';

export const appRouter = router({
  lolRouter,
  fifaRouter,
});

export type AppRouter = typeof appRouter;
