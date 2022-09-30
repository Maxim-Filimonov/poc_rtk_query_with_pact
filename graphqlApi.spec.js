import {store} from './store';
import {api, getPostsQuery} from './graphqlApi';
import {PactV3} from '@pact-foundation/pact';
import {setGqlUrl} from './config.slice';
import {print} from 'graphql';
import {mockGqlQuery} from './gql_pact_utils';

const provider = new PactV3({
  consumer: 'poc_rtk_query',
  provider: 'graphql_api',
});
it('can query posts', async () => {
  provider.addInteraction(
    mockGqlQuery({
      interactionDescription: 'a request for posts',
      query: getPostsQuery,
      respondWith: {
        posts: {
          data: [
            {
              id: '213',
              title: 'test',
            },
          ],
        },
      },
    }),
  );
  return provider.executeTest(async mockServer => {
    store.dispatch(setGqlUrl(mockServer.url));
    const result = await store.dispatch(api.endpoints.getPosts.initiate());

    expect(result.data.length).toBeGreaterThan(0);
  });
});
