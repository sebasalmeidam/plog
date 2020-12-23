import React from 'react';
import { ApolloProvider, ApolloLink, ApolloClient, HttpLink, InMemoryCache, useReactiveVar } from '@apollo/client';
import { category, summary } from './ActivityCache'

import Categories from './Categories'
import ActivityList from './ActivityList'
import Summary from './Summary'

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
  const summaryActive = useReactiveVar(summary);
  
  const showSummary = () => {
    summary(true)
    category('')
  }

  const activity_or_summary = () => {
    if (summaryActive) {
      return <Summary />
    } else {
      return <ActivityList />
    }
  }

  
  return (
    <ApolloProvider client={client}>
      <div className="row">
        <Categories />
      </div>
      
      <div className="row">
        <div className="lighter-font col-12">
          <h3 className="mt-4 text-left h3-responsive font-weight-bolder">
            Activities
          <button onClick={showSummary} className="btn btn-sm btn-primary btn-rounded">Summary</button>
            {summaryActive && <a href="#" onClick={(e) => { e.preventDefault(); summary(false); category('')} } style={{fontSize: '14px'}}>Back to Details</a> }
          </h3>
        </div>
        {activity_or_summary()}
      </div>
    </ApolloProvider>
  )
}