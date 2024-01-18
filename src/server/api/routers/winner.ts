import { clerkClient } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) =>{

  return {
    id: user.id, 
    username: user.username, 
    fullname: user.firstName,
    profilePicture: user.profileImageUrl,
}}

export const winnerRouter = createTRPCRouter({
    delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.winner.delete({
        where: {
          id: input.id,
        },
      });
    }),

    getOne: publicProcedure.query(async({ctx})=>{
      const authorId : string | null = ctx.userId;

      const one = await ctx.prisma.winner.findMany({
        take: 1,
        })
      
    return one
    }),
     


    getAll: publicProcedure.query( async ({ ctx }) => {
    const authorId : string | null = ctx.userId;

    if (authorId){
    const bets = await ctx.prisma.winner.findMany({
        where: {
            authorId : authorId,
    },  
});
    
    const users = (await clerkClient.users.getUserList({
      userId: bets.map((winner) => winner.authorId),
      limit: 100,
    })
    ).map(filterUserForClient);

  return bets.map((winner) => {
    const author =  users.find((user) => user.id === winner.authorId);
    console.log(author)

    if (!author) 
      throw new TRPCError({
      code:"INTERNAL_SERVER_ERROR", 
      message: "Author for post not found",
  });



    return {
    winner,
    author: {
      ...author,
      username: author.username,
      fullname: author.fullname,
      profilePicture: author.profilePicture,
     },
    };
  });
}}),


  
  create: privateProcedure
  .input(
    z.object({
        player: z.string().min(1).max(280),
        weight: z.number(),
        rank: z.number(),
        country: z.string().min(1).max(280),   
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;
    
    const currentPostCount = await ctx.prisma.winner.count({
      where: {
        authorId: "user_2Wl222xbsT9joVm2ZzORl5i3AL2",
      },
    })

    if (currentPostCount >= 14) {
      console.log("max posts")
      throw new Error(`User ${authorId} has reached maximum posts}`)
    }else{
      
    }

    const winner = await ctx.prisma.winner.create({
      data: {
        authorId,
        player : input.player,
        weight: input.weight,
        rank: input.rank,
        country: input.country,

      },
    });


    return winner;
  }),
}); 