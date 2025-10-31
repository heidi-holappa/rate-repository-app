import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';





const useRepositories = ({ sortAndOrderBy }) => {

  console.log('useRepositories orderBy:', sortAndOrderBy);

  // split sortAndOrderBy into orderBy and orderDirection
  const [orderBy, orderDirection] = sortAndOrderBy.split(':');

  

  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  });
    return {
    repositories: data ? data.repositories : undefined,
    loading,
    ...result,
  };
};

export default useRepositories;