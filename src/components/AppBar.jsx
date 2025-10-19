import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: 15,
    paddingLeft: 10,
    flexDirection: 'row',
  },
});

const tabs = [
  { key: 'repos', label: 'Repositories' },

];

const AppBar = () => {
  return (
    <View style={styles.container}>
      {tabs.map((t, i) => (
        <AppBarTab
          key={t.key}
          label={t.label}
        />
      ))}
    </View>
  );
};

export default AppBar;