import { makeVar, InMemoryCache } from '@apollo/client';
export const category = makeVar('');
export const summary = makeVar(false);

export const ActivityCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categoryName: {
          read() {
            return category();
          }
        },
        showSummary: {
          read() {
            return summary();
          }
        }
      }
    }
  }
});