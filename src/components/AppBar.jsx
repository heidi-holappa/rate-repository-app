/**
 * @file AppBar.js
 * @description Defines the top navigation bar for the app, including navigation tabs
 * and conditional rendering based on the user's authentication state.
 * Integrates with Apollo Client, React Router Native, and a custom authentication hook.
 */

import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery, useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';


import { GET_ME } from '../graphql/queries';

/**
 * @constant {Object} styles
 * @description Style definitions for the AppBar component.
 */
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


/**
 * @component AppBar
 * @description Renders the top app bar that displays navigation tabs.
 * Shows a "Sign In" or "Sign Out" option depending on the user's authentication state.
 *
 * @returns {JSX.Element} The rendered app bar component.
 */
const AppBar = () => {
  // Fetch current user data to determine authentication state
  const { data } = useQuery(GET_ME, { fetchPolicy: 'cache-and-network' });
  const isLoggedIn = Boolean(data?.me);

  // Initialize authentication and Apollo Client utilities
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

    /**
   * @function handleSignOut
   * @description Logs the user out by removing their access token, resetting
   * the Apollo Client cache, and navigating back to the home screen.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when sign-out is complete.
   */
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
            <>
            <AppBarTab to="/review" label="Create a review" />
            <Pressable onPress={handleSignOut}>
              <Text style={styles.label}>Sign Out</Text>
            </Pressable>
            </>
            ) : (
            <>
              <AppBarTab to="/signin" label="Sign In" />
              <AppBarTab to="/signup" label="Sign Up" />
            </>
          )}
        </ScrollView>
    </View>
  );
};

export default AppBar;