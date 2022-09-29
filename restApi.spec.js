import {store} from './store';
import {pokemonApi} from './restApi';
import {PactV3} from '@pact-foundation/pact';
import {setUrl} from './config.slice';

const provider = new PactV3({
  consumer: 'poc_rtk_query',
  provider: 'pokemon_api',
});

it('can make a request', () => {
  provider.addInteraction({
    uponReceiving: 'a request for a pokemon by name',
    withRequest: {
      method: 'GET',
      path: '/pokemon/bulbasaur',
    },
    willRespondWith: {
      status: 200,
      body: {
        name: 'bulbasaur',
        height: 7,
      },
    },
  });
  return provider.executeTest(async mockServer => {
    store.dispatch(setUrl(mockServer.url));
    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonByName.initiate(
        'bulbasaur',
        mockServer.url,
      ),
      {
        track: true,
      },
    );

    expect(result.data.height).toEqual(7);
    expect(result.data.name).toEqual('bulbasaur');
  });
});
