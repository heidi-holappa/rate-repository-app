/**
 * @file AppBarTab.js
 * @description Defines a reusable navigation tab component for the AppBar.
 * Each tab acts as a navigational link within a React Native app using React Router Native.
 */


import { Link } from 'react-router-native';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

/**
 * @constant {Object} styles
 * @description Style definitions for the AppBarTab component.
 */
const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  label: {
    color: theme.colors.labelPrimary,
    fontWeight: '700',
  },
  activeLabel: {
    color: theme.colors.labelPrimary,
    fontWeight: '700',
  },
});



/**
 * @component AppBarTab
 * @description A single tab item within the AppBar that navigates to a specific route.
 * Uses React Router Native's `<Link>` component for navigation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The text displayed on the tab.
 * @param {string} props.to - The route path to navigate to when the tab is pressed.
 *
 * @returns {JSX.Element} A styled navigation tab component.
 *
 * @example
 * // Example usage:
 * <AppBarTab label="Repositories" to="/" />
 */
const AppBarTab = ({ label, to }) => (
  <Link to={to} underlayColor={"transparrent"} style={styles.tab}>
    <Text style={styles.label}>{label}</Text>
  </Link>
);

export default AppBarTab;