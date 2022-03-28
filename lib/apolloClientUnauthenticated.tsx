import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";

const hasuraGraphqlApi = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

interface IApolloProviderWrapperProps {
  children: ReactNode;
}

export const UnauthenticatedApolloProviderWrapper = ({
  children,
}: IApolloProviderWrapperProps) => {
  const authMiddleware = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        "X-Hasura-User-Role": "viewer",
      },
    };
  });

  const httpLink = new HttpLink({
    uri: hasuraGraphqlApi,
  });

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
