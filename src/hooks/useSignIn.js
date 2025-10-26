import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';


/**
 * Custom hook for signing in a user with GraphQL + Apollo.
 * @returns {[Function, Object]} - [signIn, mutationResult]
 */
const useSignIn =  () => {
  
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();

  

  const signIn = async ({ username, password }) => {
    
    try {
        const {data} = await mutate(
            {variables: {credentials: {username, password}}}
        );
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();      
        return { data }

    } catch (e) {
        console.log(e);
        throw e;
    }
    
  };

  return [signIn, result];
};

export default useSignIn;