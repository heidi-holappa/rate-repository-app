import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';


import useRepository from '../hooks/useRepository';

const SingleRepository = () => {
    const { id } = useParams();

    console.log('SingleRepository id:', id);
    const { repository, loading, error } = useRepository(id);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <RepositoryItem repository={repository} isSingleRepository={true} />
    );  
}

export default SingleRepository;