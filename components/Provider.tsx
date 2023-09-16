'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import  { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";
const Provider = ({ children }: { children:ReactNode }) => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql/",
    cache: new InMemoryCache(),
  });
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const theme = extendTheme({ colors });
  return (
      <ApolloProvider client={client}>{children}</ApolloProvider>
  );
};

export default Provider;
