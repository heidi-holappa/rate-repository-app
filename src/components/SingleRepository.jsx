import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { FlatList, View } from 'react-native';

import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';

import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View />;

const RepositoryInfo = ({ repository }) => {
    return (
        <RepositoryItem repository={repository} isSingleRepository={true} />
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
            renderItem={({ item }) => <ReviewItem review={item} isMyReviews={false}/>}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        />
    );  
}

export default SingleRepository;