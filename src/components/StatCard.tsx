import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing } from '@/constants/theme';

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
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    ...shadows.soft
  },
  title: {
    color: colors.subText,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  value: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 24
  }
});
