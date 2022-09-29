import {store} from './store';
import {pokemonApi} from './restApi';

it('can make a request', async () => {
  const result = await store.dispatch(
    pokemonApi.endpoints.getPokemonByName.initiate('bulbasaur'),
    {
      track: true,
    },
  );

  expect(result.data.height).toEqual(7);
  expect(result.data.name).toEqual('bulbasaur');
});
