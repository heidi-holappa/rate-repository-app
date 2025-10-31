import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';



const UseReviews = (id) => {
    // Hook logic here
    const { data, loading, error } = useQuery(GET_REPOSITORY_REVIEWS, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    return {
        reviews: data ? data.repository.reviews : undefined,
        loading,
        error,
    }; 
}

export default UseReviews;