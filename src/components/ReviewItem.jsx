import Text from './Text';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  // review item row
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
  
});



// helper to format ISO date to DD.MM.YYYY
const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};


const ReviewItem = ({ review }) => {
    console.log("ReviewItem - review data:", review);
    return (
        <View style={styles.reviewRow}>
            <View style={styles.ratingCircle}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewContent}>
                <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
                <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
}

export default ReviewItem;