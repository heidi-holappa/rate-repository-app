import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchbar: {
        marginBottom: 10,
        backgroundColor: 'white',
    },
});

const FilterRepositories = ({ filterQuery, setFilterQuery }) =>{
    return (

        <Searchbar
        placeholder="Filter repositories"
        onChangeText={setFilterQuery}
        value={filterQuery}
        style={styles.searchbar}
      />
    );
}

export default FilterRepositories;