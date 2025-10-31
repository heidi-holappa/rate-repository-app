import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';


/**
 * Hook to delete a review by its ID.
 *
 * @returns {[Function, Object]} A tuple containing the deleteReview function and the mutation result object.
 */
const useDeleteReview = () => {
    const [deleteReviewMutation, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id) => {
        try {
            await deleteReviewMutation({ variables: { id } });
        } catch (e) {
            console.error("Error deleting review:", e);
        }
    };

    return [deleteReview, result];
};

export default useDeleteReview;