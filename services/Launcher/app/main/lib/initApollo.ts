// Launcher/app/main/lib/initApollo.ts
import 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { loadConfig } from '../App/Settings';

export let apolloClient: ApolloClient<NormalizedCacheObject>;

export const initClient = async () => {
  const config = await loadConfig();
  apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: `${config.serverURL}/graphql`,
    }),
    cache: new InMemoryCache({ addTypename: false }),
  });
};
