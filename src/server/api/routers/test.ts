import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: { id: string|null; username: string|null; firstName: string|null; profileImageUrl: string|null; }) =>{

  return {
    id: user.id, 
    username: user.username, 
    fullname: user.firstName,
    profilePicture: user.profileImageUrl,
}}

export const noteRouter = createTRPCRouter({
    getAll: publicProcedure.query( async ({ ctx }) => {
    const tests = await ctx.prisma.test.findMany({
      take: 100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: tests.map((test) => test.authorId),
      limit: 100,
    })
    ).map(filterUserForClient);

  return tests.map((test) => {
    const author =  users.find((user) => user.id === test.authorId);
    console.log(author)

    if (!author) 
      throw new TRPCError({
      code:"INTERNAL_SERVER_ERROR", 
      message: "Author for post not found",
  });



    return {
    test,
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
      content: z.string().min(1).max(280),
      test: z.string().min(1).max(280),
    
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;


    const test = await ctx.prisma.test.create({
      data: {
        authorId,
        content : input.content,
        test: input.test,
      },
    });
    return test;
  }),
}); 