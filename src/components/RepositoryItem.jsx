// ...existing code...
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { openURL } from "expo-linking";
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  // container style
  container: { padding: 15, backgroundColor: 'white' },
  // margin for each line of text
  line: { marginBottom: 6 },
  // style for bold label text
  label: { fontWeight: '700' },
  introRow: {
    flexDirection: 'row',
  },
  statisticsRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  descriptionFlex: {
    flex: 1,
  },
  fullName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#586069',
  },
  languageTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  openInGitHubButton: {
    marginTop: 20,
    backgroundColor: '#0366d6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',    // center the button horizontally
    // stretch to full width
    width: '100%',
  },
  openInGitHubText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontWeight: '700',
    marginTop: 8,
  },
  statValue: {
    color: '#586069',
    textAlign: 'center',
  },
});


const formatCountField = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  
  return String(count);   
};


const RepositoryItem = ({ repository, isSingleRepository }) => {

  const { 
    fullName, 
    description, 
    language, 
    forksCount, 
    stargazersCount, 
    ratingAverage, 
    reviewCount,
    ownerAvatarUrl,
    url
  } = repository;


  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.introRow}>
        <Image source={{ uri: ownerAvatarUrl}} style={styles.avatar}></Image>
        <View style={styles.descriptionFlex}>
            <Text fontWeight='bold'>{fullName}</Text>
            <Text fontSize='subheading'>{description}</Text>
            <Text style={theme.languageTag}>{language}</Text>
        </View>
      </View>
      
      <View style={styles.statisticsRow}>
        <View style={styles.statItem}>
            <Text fontWeight='bold'>{formatCountField(stargazersCount)}</Text>
            <Text fontSize='subheading'>Stars</Text>
        </View>
        <View style={styles.statItem}>
            <Text fontWeight='bold'>{formatCountField(forksCount)}</Text>
            <Text fontSize='subheading'>Forks</Text>
        </View>
        <View style={styles.statItem}>
            <Text fontWeight='bold'>{formatCountField(reviewCount)}</Text>
            <Text fontSize='subheading'>Reviews</Text>
        </View>
        <View style={styles.statItem}>
            <Text fontWeight='bold'>{ratingAverage}</Text>
            <Text fontSize='subheading'>Rating</Text>
        </View>
      </View>
      { isSingleRepository && (
          <View style={styles.buttonRow}>
            <Pressable onPress={() => openURL(url)} style={styles.openInGitHubButton}>
              <Text style={styles.openInGitHubText}>Open in GitHub</Text>
            </Pressable>
          </View>
        )}
    </View>
    
  );
};

export default RepositoryItem;
