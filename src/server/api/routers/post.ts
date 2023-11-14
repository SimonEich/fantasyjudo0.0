import { clerkClient } from "@clerk/nextjs";
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

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query( async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 5,
    });

    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 3,
    })
    ).map(filterUserForClient);

  return posts.map((post) => {
    const author =  users.find((user) => user.id === post.authorId);
    console.log(author)

    if (!author) 
      throw new TRPCError({
      code:"INTERNAL_SERVER_ERROR", 
      message: "Author for post not found",
  });



    return {
    post,
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
      content: z.string().max(280),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;


    

    const currentPostCount = await ctx.prisma.post.count()

    if (currentPostCount<3){
      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content : input.content,
        },
      });
      return post

    }else{
      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content : "too many post",
        },
      });
      return post

    }
  }),
}); 