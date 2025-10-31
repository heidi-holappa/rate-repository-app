import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';

import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';

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



const ItemSeparator = () => <View />;


// helper to format ISO date to DD.MM.YYYY
const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const RepositoryInfo = ({ repository }) => {
    return (
        <RepositoryItem repository={repository} isSingleRepository={true} />
    );
}


const ReviewItem = ({ review }) => {
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


const SingleRepository = () => {
    const { id } = useParams();

    console.log('SingleRepository id:', id);
    const { repository, loading, error } = useRepository(id);

    const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(id);


    if (loading || reviewsLoading) {
        return <Text>Loading...</Text>;
    }

    if (error || reviewsError) {
        return <Text>Error: {error ? error.message : reviewsError.message}</Text>;
    }

    const reviewNodes = reviews?.edges ? 
        reviews.edges.map(edge => edge.node) : [];

    console.log('Repository data:', repository);
    console.log('Reviews data:', reviewNodes);

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        />
    );  
}

export default SingleRepository;