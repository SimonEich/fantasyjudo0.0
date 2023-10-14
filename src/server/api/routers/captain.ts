import { clerkClient } from "@clerk/nextjs"
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: { id: any; username: any; firstName: any; profileImageUrl: any; }) =>{

  return {
    id: user.id, 
    username: user.username, 
    fullname: user.firstName,
    profilePicture: user.profileImageUrl,
}}

export const captainRouter = createTRPCRouter({
    getAll: publicProcedure.query( async ({ ctx }) => {
    const bets = await ctx.prisma.captain.findMany({
      take: 100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: bets.map((captain) => captain.authorId),
      limit: 100,
    })
    ).map(filterUserForClient);

  return bets.map((captain) => {
    const author =  users.find((user) => user.id === captain.authorId);
    console.log(author)

    if (!author) 
      throw new TRPCError({
      code:"INTERNAL_SERVER_ERROR", 
      message: "Author for post not found",
  });



    return {
    captain,
    author: {
      ...author,
      username: author.username,
      fullname: author.fullname,
      profilePicture: author.profilePicture,
     },
    };
  });
  }),

  create: privateProcedure
  .input(
    z.object({
        captain : z.string().min(1).max(280),
        weight: z.number(),
        country: z.string().min(1).max(280),
    
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;


    const test = await ctx.prisma.captain.create({
      data: {
        authorId,
        captain : input.captain,
        weight: input.weight,
        country: input.country,
      },
    });
    return test;
  }),
}); 