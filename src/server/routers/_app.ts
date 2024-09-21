import { router } from '../trpc';
import { lolRouter } from './lol'; 
import { fifaRouter } from './sheetsFifa';

export const appRouter = router({
  lolRouter,
  fifaRouter,
});

export type AppRouter = typeof appRouter;