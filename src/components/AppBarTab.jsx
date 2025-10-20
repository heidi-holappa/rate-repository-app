import { Link } from 'react-router-native';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

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

const AppBarTab = ({ label, to }) => (
  <Link to={to} underlayColor={"transparrent"} style={styles.tab}>
    <Text style={styles.label}>{label}</Text>
  </Link>
);

export default AppBarTab;