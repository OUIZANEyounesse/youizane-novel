import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "../../../prisma/db";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { context } from "@/graphql/context";





const apolloServer = new ApolloServer<context>({
  resolvers,
  typeDefs,
});

const start = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
  }),
});
export { start as POST, start as GET };
