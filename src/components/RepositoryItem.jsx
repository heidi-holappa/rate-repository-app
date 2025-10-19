// ...existing code...
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // container style
  container: { padding: 15, backgroundColor: 'white' },
  // margin for each line of text
  line: { marginBottom: 6 },
  // style for bold label text
  label: { fontWeight: '700' },
});

const RepositoryItem = ({ item }) => {
  if (!item) return null;

  const { 
    fullName, 
    description, 
    language, 
    forksCount, 
    stargazersCount, 
    ratingAverage, 
    reviewCount
} = item;

  return (
    <View style={styles.container}>
      <Text style={styles.line}>
        <Text style={styles.label}>Full name: </Text>{fullName}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>Description: </Text>{description}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>Language: </Text>{language}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>Stars: </Text>{stargazersCount}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>Forks: </Text>{forksCount}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>Reviews: </Text>{reviewCount}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>Rating: </Text>{ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem;
