import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();

    const createReview = async ({ repositoryName, ownerName, rating, text }) => {
        console.log('Creating review with:', { repositoryName, ownerName, rating, text });
        try {
            const { data } = await mutate({
                variables: {
                    review: {
                        repositoryName,
                        ownerName,
                        rating: Number(rating),
                        text,
                    },
                },
            });
            await apolloClient.resetStore();
            return { data };
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    return [createReview, result];
}

export default useReview;