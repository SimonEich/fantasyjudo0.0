import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/post";
import { noteRouter } from "./routers/test";
import { nameRouter } from "./routers/name";
import { captainRouter } from "./routers/captain";
import { teamRouter } from "./routers/team";
import { timeendRouter } from "./routers/timeend";
import { winnerRouter } from "./routers/winner";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postsRouter,
  test: noteRouter,
  name: nameRouter,
  captain: captainRouter,
  team: teamRouter,
  time: timeendRouter,
  winner: winnerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
