import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';


/**
 * Custom hook for signing in a user with GraphQL + Apollo.
 * @returns {[Function, Object]} - [signIn, mutationResult]
 */
const useSignUp =  () => {
  
  const [mutate, result] = useMutation(CREATE_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  /**
   * Signs up a user with the provided username and password.
   * @param {Object} param0 - The user credentials.
   * @param {string} param0.username - The username.
   * @param {string} param0.password - The password.
   * @returns {Promise<Object>} - The mutation result.
   */
  const signUp = async ({ username, password }) => {
    const variables = { user: { username, password } };
    const data = await mutate({ variables });
    return data;
  };

  return [signUp, result];


};

export default useSignUp;