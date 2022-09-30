import {createApi} from '@reduxjs/toolkit/query/react';
import {request, gql, ClientError} from 'graphql-request';

const graphqlBaseQuery = async (
  {body},
  {signal, dispatch, getState},
  extraOptions,
) => {
  try {
    const url = getState().config.gqlUrl;
    const result = await request(url, body);

    return {data: result};
  } catch (error) {
    console.error('GQL ERROR', error);
    if (error instanceof ClientError) {
      return {error: {status: error.response.status, data: error.message}};
    }
    return {error: {status: 500, data: error}};
  }
};

export const getPostsQuery = gql`
  query {
    posts {
      data {
        id
        title
      }
    }
  }
`;
export const getPostByIdQuery = id => gql`
        query {
          post(id: ${id}) {
            id
            title
            body
          }
        }
        `;

export const api = createApi({
  baseQuery: graphqlBaseQuery,
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        body: getPostsQuery,
      }),
      transformResponse: response => response.posts.data,
    }),
    getPost: builder.query({
      query: id => ({
        body: getPostByIdQuery(id),
      }),
      transformResponse: response => response.post,
    }),
  }),
});
