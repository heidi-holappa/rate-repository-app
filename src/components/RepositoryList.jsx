import { useState } from 'react';
import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';


import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import SortAndOrderBy from './SortAndOrderBy';

import FilterRepositories from './FilterRepositories';


/**
 * A separator component for the list items.
 */
const ItemSeparator = () => <View />;

/**
 * A single item in the repository list that navigates to the repository details on press.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.repository - The repository data.
 * @returns {JSX.Element} The rendered RepositoryListItem component.
 */
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

/**
 * The container component for the repository list.
 * @param {Object} props - The component props.
 * @param {Object} props.repositories - The repositories data.
 * @returns {JSX.Element} The rendered RepositoryListContainer component.
 */
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


/**
 * The main RepositoryList component that manages sorting, filtering, and displays the list of repositories.
 * @returns {JSX.Element} The rendered RepositoryList component.
 */
const RepositoryList = () => {
  const [sortAndOrderBy, setSortAndOrderBy] = useState('CREATED_AT:DESC');
  const [filterQuery, setFilterQuery] = useState('');


  const { repositories } = useRepositories( { sortAndOrderBy: sortAndOrderBy, filterBy: filterQuery } );

  return (
    <>
      <FilterRepositories filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      <SortAndOrderBy sortAndOrderBy={sortAndOrderBy} setSortAndOrderBy={setSortAndOrderBy} />
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};


export default RepositoryList;