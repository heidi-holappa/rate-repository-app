import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';





const useRepositories = ({ sortAndOrderBy, filterBy }) => {

  console.log('useRepositories orderBy:', sortAndOrderBy);
  console.log('useRepositories filterBy:', filterBy);

  // split sortAndOrderBy into orderBy and orderDirection
  const [orderBy, orderDirection] = sortAndOrderBy.split(':');

  

  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { 
      orderBy: orderBy, 
      orderDirection: orderDirection, 
      searchKeyword: filterBy },
    fetchPolicy: 'cache-and-network',
  });
    return {
    repositories: data ? data.repositories : undefined,
    loading,
    ...result,
  };
};

export default useRepositories;