import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';


const useMe = ( includeReviews ) => {

    console.log('useMe - includeReviews:', includeReviews);
    const { data } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables : { includeReviews: includeReviews },
    });

    console.log('useMe - data:', data?.me);
    console.log('useMe - reviews:', data?.me?.reviews);
    return { user: data?.me, reviews: data?.me?.reviews };
};

export default useMe;

