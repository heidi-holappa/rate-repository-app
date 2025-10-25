import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";


/**
 * Custom hook for signing in a user with GraphQL + Apollo.
 * @returns {[Function, Object]} - [signIn, mutationResult]
 */
const useSignIn =  () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  

  const signIn = async ({ username, password }) => {
    
    try {
        const {data} = await mutate(
            {variables: {credentials: {username, password}}}
        );
        
        
        return { data }

    } catch (e) {
        console.log(e);
        throw e;
    }
    
  };

  return [signIn, result];
};

export default useSignIn;