import {GraphQLInteraction} from '@pact-foundation/pact/src/dsl/graphql';

export function mockGqlQuery({
  interactionDescription,
  query,
  variables = {},
  respondWith,
  states = [],
  useQuery = false,
}) {
  const interaction = new GraphQLInteraction()
    .uponReceiving(interactionDescription)
    .withRequest({
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // .withOperation('operation')
    .withQuery(query)
    // .withVariables(variables)
    .willRespondWith({
      status: 200,
      body: {
        data: respondWith,
      },
    });
  return convertApolloToV3Interaction(interaction, useQuery, states);
}

function convertApolloToV3Interaction(
  apolloInteraction,
  useQuery,
  states = [],
) {
  const interaction = apolloInteraction.json();
  const reqBody = interaction.request.body;
  const body = useQuery ? [reqBody] : reqBody;
  return {
    states,
    uponReceiving: interaction.description,
    withRequest: {
      method: interaction.request.method,
      path: interaction.request.path,
      query: {}, // this is not used on gql interactions
      body,
      headers: interaction.request.headers,
    },
    willRespondWith: {
      status: interaction.response.status,
      body: interaction.response.body,
      headers: interaction.response.headers,
    },
  };
}
