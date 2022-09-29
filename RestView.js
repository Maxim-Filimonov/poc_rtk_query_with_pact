import React, {Text} from 'react-native';
import {useGetPokemonByNameQuery} from './restApi';

export default function RestView() {
  // Using a query hook automatically fetches data and returns query values
  const {data, error, isLoading} = useGetPokemonByNameQuery('bulbasaur');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
  if (isLoading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <Text>
        {data?.name} has {data?.abilities.length} abilities.
      </Text>
    );
  }
}
