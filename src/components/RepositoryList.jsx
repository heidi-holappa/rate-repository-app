/*
The RepositoryList component should render the FlatList component and RepositoryItem a single item on the list (hint: use the FlatList component's renderItem prop). Use this as the basis for the RepositoryList.jsx file:
*/
import { FlatList, View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const ItemSeparator = () => <View />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  console.log('repository nodes:', repositoryNodes);

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
    />
  );
};

export default RepositoryList;