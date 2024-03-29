import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";


export const nameRouter = createTRPCRouter({
    getAll: publicProcedure.query( async ({ ctx }) => {
    const names = await ctx.prisma.name.findMany({
      take: 100,
    });


    const users = (await clerkClient.users.getUserList({
        userId: names.map((name) => name.authorId),
        limit: 100,
      })
      );
   
  return names.map((name) => {
    const author =  users.find((user) => user.id === name.authorId);
    console.log(author)

    if (!author) 
      throw new TRPCError({
      code:"INTERNAL_SERVER_ERROR", 
      message: "Author for post not found",
  });



    return {
    name,
    author: {
      ...author,
      username: author.username,
     },
    };
  });
  }),

  create: privateProcedure
  .input(
    z.object({
      name: z.string().min(1).max(280),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId ;

    const currentPostCount = await ctx.prisma.winner.count({
      where: {
        authorId: authorId,
      },
    })

   if (currentPostCount <= 1) {
    const name = await ctx.prisma.name.create({
      data: {
        authorId,
        name : input.name,
      },
    });

  }

    return name;
  }),
}); 