import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  // container style
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;