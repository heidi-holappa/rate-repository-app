import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery, useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';


import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: 15,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  label: {
    color: theme.colors.labelPrimary,
    fontWeight: '700',
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_ME, { fetchPolicy: 'cache-and-network' });
  const isLoggedIn = Boolean(data?.me);

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate('/');
    } catch (e) {
      console.error('Sign out failed:', e);
    }
  };
  

  return (
    <View style={styles.container}>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', flexDirection: 'row' }}
        >
          <AppBarTab to="/" label="Repositories" />
          {isLoggedIn ? (
            <Pressable onPress={handleSignOut}>
              <Text style={styles.label}>Sign Out</Text>
            </Pressable>
            ) : (
            <AppBarTab to="/signin" label="Sign In" />
          )}
        </ScrollView>
    </View>
  );
};

export default AppBar;