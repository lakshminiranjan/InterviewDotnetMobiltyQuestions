import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, shadows, spacing } from '@/constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const AppButton = ({ label, onPress, variant = 'primary' }: Props): JSX.Element => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.base,
      variant === 'primary' && styles.primary,
      variant === 'secondary' && styles.secondary,
      variant === 'ghost' && styles.ghost,
      pressed && styles.pressed
    ]}
  >
    <Text
      style={[
        styles.text,
        variant === 'secondary' && styles.secondaryText,
        variant === 'ghost' && styles.ghostText
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center'
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.soft
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  ghost: {
    backgroundColor: colors.primarySoft
  },
  text: {
    color: colors.surface,
    fontWeight: '700'
  },
  secondaryText: {
    color: colors.text
  },
  ghostText: {
    color: colors.primary
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }]
  }
});
