import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.test.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: privateProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), topicId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.test.create({
        data: {
          authorId: input.title,
          content: input.topicId,
        },
      });
    }),

  getAll: privateProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        where: {
          authorId: input.topicId,
        },
      });
    }),
});