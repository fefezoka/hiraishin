import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return { req, res };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
