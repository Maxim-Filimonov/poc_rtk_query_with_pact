import React, {ScrollView, Text, View} from 'react-native';
import {useGetPostsQuery} from './graphqlApi';

export default function GraphqlView() {
  const {data, error, isLoading} = useGetPostsQuery();
  if (isLoading) {
    return <Text>Loading posts</Text>;
  }
  if (error) {
    return <Text>Error loading posts: ${error}</Text>;
  }
  const postsView = data.map(p => <Text key={p.id}>Post ::: {p.title}</Text>);
  return (
    <ScrollView>
      <Text>==========</Text>
      {postsView}
    </ScrollView>
  );
}
