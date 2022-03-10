import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUser } from "@clerk/clerk-react";
import { ReactNode } from "react";

const hasuraGraphqlApi = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

interface IApolloProviderWrapperProps {
  children: ReactNode;
}

export const ApolloProviderWrapper = ({
  children,
}: IApolloProviderWrapperProps) => {
  const user = useUser();
  const authMiddleware = setContext(async (_, { headers }) => {
    const token = await user.getToken("hasura");
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
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
