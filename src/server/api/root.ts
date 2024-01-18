import { createTRPCRouter } from "~/server/api/trpc";
import { nameRouter } from "./routers/name";
import { teamRouter } from "./routers/team";
import { winnerRouter } from "./routers/winner";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  name: nameRouter,
  team: teamRouter,
  winner: winnerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
