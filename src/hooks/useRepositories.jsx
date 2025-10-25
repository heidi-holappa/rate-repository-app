import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useState, useEffect } from 'react';

const useRepositories = (variables) => {
  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
    return {
    repositories: data ? data.repositories : undefined,
    loading,
    ...result,
  };
};

export default useRepositories;