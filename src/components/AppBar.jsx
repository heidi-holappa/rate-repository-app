import { View, StyleSheet, ScrollView } from 'react-native';
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
  { key: 'repos', label: 'Repositories', to: '/' },
  { key: 'signin', label: 'Sign In', to: '/signin' },
];

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', flexDirection: 'row' }}
        >{}
          {tabs.map((t, i) => (
            <AppBarTab
              key={t.key}
              label={t.label}
              to={t.to}
            />
          ))}
        </ScrollView>
    </View>
  );
};

export default AppBar;