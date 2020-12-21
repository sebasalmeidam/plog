import React from 'react';
import { ApolloProvider, ApolloLink, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import Categories from './Categories'
import ActivityList from './ActivityList'

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
  cache
})

export default function Activities() {
  return (
    <ApolloProvider client={client}>
      <div className="row">
        <Categories />
      </div>
      
      <div className="row">
        <ActivityList />
      </div>
    </ApolloProvider>
  )
}