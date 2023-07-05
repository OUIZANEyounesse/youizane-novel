import { Prisma } from "@prisma/client";
import { context } from "@/graphql/context";
import { IAuthor } from "@/types/typings";

export const resolvers = {
  Query: {
    novels: async (parent: any, args: any, context: context) => {
      return await context.prisma.novel.findMany();
    },
    novel: async (parent: any, args: any, context: context) => {
      return await context.prisma.novel.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    authors: async (parent: any, args: any, context: context) => {
      return await context.prisma.author.findMany();
    },
  },
  Novel: {
    authors: async (parent: any, args: any, context: context) => {
      return await context.prisma.novelOnAuthor.findMany({
        where: {
          novelId: parent.id,
        },
      });
    },
  },
  NovelOnAuthor: {
    author: async (parent: any, args: any, context: context) => {
      return await context.prisma.author.findUnique({
        where: {
          id: parent.authorId,
        },
      });
    },
  },
  Mutation: {
    addNovel: async (parent: any, args: any, context: context) => {
      let novel: Prisma.NovelCreateInput;
      novel = {
        title: args.title,
        image: args.image,
        desccription: args.desccription,
        authors: {
          create: {
            authorId: args.authorId,
          },
        },
      };
      return await context.prisma.novel.create({
        data: novel,
      });
    },
    updateNovel: async (parent: any, args: any, context: context) => {
      let novel: Prisma.NovelCreateInput;
      novel = {
        title: args.title,
        image: args.image,
        desccription: args.desccription,
      };
      return await context.prisma.novel.update({
        where: {
          id: args.id,
        },
        data: novel,
      });
    },
    deleteNovel: async (parent: any, args: any, context: context) => {
      return await context.prisma.novel.delete({
        where: {
          id: args.id,
        },
      });
    },
    deleteAuthor: async (parent: any, args: any, context: context) => {
      return await context.prisma.author.delete({
        where: {
          id: args.id,
        },
      });
    },
    updateAuthor: async (parent: any, args: any, context: context) => {
      return await context.prisma.author.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    addAuthor: async (parent: any, args: any, context: context) => {
      return await context.prisma.author.create({
        data: {
          name: args.name,
        },
      });
    },

    assignAuthorToNovel: async (parent: any, args: any, context: context) => {
      return await context.prisma.novelOnAuthor.create({
        data: {
          novelId: args.novelId,
          authorId: args.authorId,
        },
      });
    },
    unssignAuthorToNovel: async (parent:any, args:any,context:context) =>{
        return await context.prisma.novelOnAuthor.delete({
            where: {
                id: args.relationId,
            },
        });
    }
  },
};
