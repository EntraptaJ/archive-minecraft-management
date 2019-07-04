// UI/ui/lib/initApollo.tsx
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache, NormalizedCacheObject, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import WS from 'ws'
import { OperationDefinitionNode } from 'graphql';
import { createUploadLink } from 'apollo-upload-client';

interface InitClientParams {
  baseUrl: string;
  initialState?: NormalizedCacheObject;
  token?: string;
}

export const initApollo = ({ baseUrl, initialState, token }: InitClientParams) => {
  const httpLink = createUploadLink({
    uri: `${baseUrl}/graphql`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://${baseUrl}/graphql`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: {
        authToken: token,
    },
    },
    webSocketImpl: !process.browser ? WS : WebSocket
  });

  const terminatingLink = split(
    ({ query: { definitions } }) =>
      definitions.some(node => {
        const { kind, operation } = node as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      }),
    wsLink,
    httpLink
  );
  
  const link = ApolloLink.from([terminatingLink]);

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
};
