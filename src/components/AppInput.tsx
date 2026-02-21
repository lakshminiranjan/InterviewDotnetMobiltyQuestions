import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
}

export const AppInput = ({ label, ...props }: Props): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput placeholderTextColor={colors.subText} style={styles.input} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  label: {
    color: colors.text,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text
  }
});
