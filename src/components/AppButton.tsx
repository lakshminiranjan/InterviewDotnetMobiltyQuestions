import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const AppButton = ({ label, onPress, variant = 'primary' }: Props): JSX.Element => (
  <Pressable
    onPress={onPress}
    style={[styles.base, variant === 'secondary' ? styles.secondary : styles.primary]}
  >
    <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center'
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border
  },
  text: {
    color: colors.background,
    fontWeight: '600'
  },
  secondaryText: {
    color: colors.text
  }
});
