/*
The RepositoryList component should render the FlatList component and RepositoryItem a single item on the list (hint: use the FlatList component's renderItem prop). Use this as the basis for the RepositoryList.jsx file:
*/
import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const ItemSeparator = () => <View />;

const RepositoryListItem = ({ repository }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/repository/${repository.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <RepositoryItem repository={repository} isSingleRepository={false} />
    </Pressable>
  );
}

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  console.log('repository nodes:', repositoryNodes);

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryListItem repository={item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;