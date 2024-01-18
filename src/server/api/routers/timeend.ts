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

export const timeendRouter = createTRPCRouter({
    delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.timeEnd.delete({
        where: {
          id: input.id,
        },
      });
    }),

    


    getAll: publicProcedure.query( async ({ ctx }) => {
    const authorId : string | null = ctx.userId;

    if (authorId){
    const time = await ctx.prisma.timeEnd.findMany();

    if (!authorId) 
      throw new TRPCError({
      code:"INTERNAL_SERVER_ERROR", 
      message: "Author for post not found",
  });



    return {
    time,
    timeEnd: {
        ...time,
        day : time,
        month : time,
        year : time,
        hour : time,
        competitionName : time,
      },
     };
   }}),





create: privateProcedure
  .input(
    z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
        hour: z.number(),
        competitionName: z.string()
      })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;
    
    const currentPostCount = await ctx.prisma.timeEnd.count()

    if (currentPostCount >= 5) {
      console.log("max posts")
      throw new Error(`User ${authorId} has reached maximum posts}`)
    }else{
      
    }

    const compdata = await ctx.prisma.timeEnd.create({
      data: {
        day : input.day,
        month : input.month,
        year : input.year,
        hour : input.hour,
        competitionName : input.competitionName,
      },
    });


    return compdata;
  }),
}); 