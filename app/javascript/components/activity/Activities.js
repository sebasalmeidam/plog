import React from 'react';
import { ApolloProvider, ApolloLink, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content'),
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
  resolvers: {}
})


export default function Activities() {
  return (
    <ApolloProvider client={client}>
      <div>prueba</div>
    </ApolloProvider>
  )
}