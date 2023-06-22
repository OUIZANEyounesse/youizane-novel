import { Prisma } from "@prisma/client";
import { context } from "@/graphql/context";


export const resolvers = {
    Query: {
      novels: async (parent:any, args:any, context:context) =>{
          return await context.prisma.novel.findMany();
      },
      novel: async (parent:any, args:any, context:context) =>{
          return await context.prisma.novel.findUnique({
              where: {
                  id:args.id
              }
          });
      },
      authors: async (parent:any, args:any, context:context) =>{
          return await context.prisma.author.findMany();
      },
  },
   Novel:{
      author: async (parent:any, args:any, context:context) =>{
          return await context.prisma.author.findMany({
              where:{
                  novelId: parent.id,
              }
          });
      }
   },
   Mutation: {
      addNovel: async (parent:any, args:any, context:context) =>{
          let novel : Prisma.NovelCreateInput;
          novel = {
              title: args.title,
              image: args.image,
             
          }
          return await context.prisma.novel.create({
              data :novel,
          });
      },
      updateNovel: async (parent:any, args:any, context:context) =>{
          let novel : Prisma.NovelCreateInput;
          novel = {
              title: args.title,
              image: args.image,           
          }
          return await context.prisma.novel.update({
              where:{
                  id: args.id
              },
              data :novel,
          });
      },
      deleteNovel: async (parent:any, args:any, context:context) =>{
          return await context.prisma.novel.delete({
              where:{
                  id: args.id
              }
          });
      },
      addAuthor: async (parent:any, args:any, context:context) =>{
  
          return await context.prisma.author.create({
              data :{
                  name: args.name,
                  novelId: args.novelId,
                 
              },
          });
      },
  
   }
  };