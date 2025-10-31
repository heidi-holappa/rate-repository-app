import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { Alert } from 'react-native';
import useDeleteReview from '../hooks/useDeleteReview';


const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  // review item row
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  // rating circle style
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0366d6',
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
  },
  reviewDate: {
    color: '#586069',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    
  },
  viewRepositoryButton: {
    marginTop: 10,
    backgroundColor: '#0366d6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteReviewButton: {
    marginTop: 10,
    backgroundColor: '#d73a4a',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },

});


/**
 * Format ISO date string to DD.MM.YYYY
 * @param {string} iso - ISO date string
 * @returns {string} Formatted date string
 */
const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};



/**
 * ReviewItem component displays a single review
 * @param {Object} param0 - Component props
 * @param {Object} param0.review - The review data
 * @param {boolean} param0.isMyReviews - Flag indicating if the view is for user's own reviews
 * @returns {JSX.Element} The rendered component
 */
const ReviewItem = ({ review, isMyReviews }) => {
    console.log("ReviewItem - review data:", review);
    console.log("ReviewItem - isMyReviews:", isMyReviews);

    const navigate = useNavigate();
    const apolloClient = useApolloClient();
    const [useDeleteReviewMutation] = useDeleteReview();

    /** 
      * Handle the deletion of a review
      * using the useDeleteReviewMutation hook
      * @param {string} id - The ID of the review to delete
      */
    const handleDeleteReview = (id) => {
        // implement review deletion logic
        console.log("Delete Review pressed for id:", id);
        Alert.alert(
            "Delete Review",
            "Are you sure you want to delete this review?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await useDeleteReviewMutation(id);
                            await apolloClient.resetStore(); 
                            console.log("Review deleted:", id);
                        } catch (e) {
                            console.error("Error deleting review:", e);
                        }
                    }
                }
            ]
        );  

    };

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewRow}>
                <View style={styles.ratingCircle}>
                    <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
                <View style={styles.reviewContent}>
                    {isMyReviews ? (
                        <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 4 }}>
                            {review.repository.fullName}
                        </Text>
                    ) : (
                        <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 4 }}>
                            {review.user.username}
                        </Text>
                    )}
                    <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            {isMyReviews && (
                <View style={styles.buttonRow}>
                    <Pressable style={styles.viewRepositoryButton} onPress={() => navigate(`/repository/${review.repository.id}`)}>
                        <Text style={styles.buttonText}>View Repository</Text>
                    </Pressable>
                    <Pressable style={styles.deleteReviewButton} onPress={() => handleDeleteReview(review.id)}>
                        <Text style={styles.buttonText}>Delete Review</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

export default ReviewItem;