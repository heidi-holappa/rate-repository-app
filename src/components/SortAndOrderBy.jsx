import { Picker } from '@react-native-picker/picker';


const SortAndOrderBy = ({ sortAndOrderBy, setSortAndOrderBy }) => {
    return (
        <Picker 
            selectedValue={sortAndOrderBy} 
            onValueChange={(itemValue) => setSortAndOrderBy(itemValue)}
        >
            <Picker.Item label="Latest repositories" value="CREATED_AT:DESC" />
            <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE:DESC" />
            <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE:ASC" />
        </Picker>
    );
}

export default SortAndOrderBy;