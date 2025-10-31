import { FlatList, View } from 'react-native';

import useMe from '../hooks/useMe';
import ReviewItem from './ReviewItem';


const UserReviews = () => {

    const { reviews } = useMe(includeReviews=true);

    const reviewNodes = reviews?.edges ? 
        reviews.edges.map(edge => edge.node) : [];

    console.log('UserReviews - reviews data:', reviewNodes);

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={() => <View />}            
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReviewItem review={item} />} />
    );  
};

export default UserReviews;