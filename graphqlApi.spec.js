import {store} from './store';
import {api, getPostByIdQuery, getPostsQuery} from './graphqlApi';
import {PactV3} from '@pact-foundation/pact';
import {setGqlUrl} from './config.slice';
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
it('can make a query with id', async () => {
  const postId = '2';
  provider.addInteraction(
    mockGqlQuery({
      interactionDescription: 'a request for a post by id',
      query: getPostByIdQuery(postId),
      respondWith: {
        post: {
          id: postId,
          title: 'test',
        },
      },
    }),
  );
  return provider.executeTest(async mockServer => {
    store.dispatch(setGqlUrl(mockServer.url));
    const result = await store.dispatch(api.endpoints.getPost.initiate(postId));
    expect(result.data.title).toEqual('test');
  });
});

it('caches query for second request with same parameters', async () => {
  const postId = '2';

  // we don't need to add an interaction as rtk query cache
  // takes over before making request to server
  const result = await store.dispatch(api.endpoints.getPost.initiate(postId));

  expect(result.data.title).toEqual('test');
});
