import { makeVar, InMemoryCache } from '@apollo/client';
export const category = makeVar('');

export const ActivityCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categoryName: {
          read() {
            return category();
          }
        }
      }
    }
  }
});