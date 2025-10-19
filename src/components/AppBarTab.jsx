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

const AppBarTab = ({ label}) => (
  <Pressable style={styles.tab}>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

export default AppBarTab;