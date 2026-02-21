import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface Props {
  title: string;
  value: string;
}

export const StatCard = ({ title, value }: Props): JSX.Element => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs
  },
  title: {
    color: colors.subText
  },
  value: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 20
  }
});
