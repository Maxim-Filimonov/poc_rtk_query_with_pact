import {createApi} from '@reduxjs/toolkit/query/react';
import fetch from 'cross-fetch';
// Define a service using a base URL and expected endpoints
const customBaseQuery = async (args: string, {getState}: {getState: any}) => {
  const url = getState().config.url;
  console.log('URL:::', url);
  console.log('ARGS:::', args);
  const request = await fetch(url + '/' + args);
  // get json body from fetch
  const json = await request.json();
  return {
    data: json,
  };
};
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: customBaseQuery,
  //   baseUrl: 'https://pokeapi.co/api/v2/',
  //   fetchFn: fetch,
  // },
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetPokemonByNameQuery} = pokemonApi;
