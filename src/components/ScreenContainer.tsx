import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface Props extends PropsWithChildren {
  scroll?: boolean;
}

export const ScreenContainer = ({ children, scroll = true }: Props): JSX.Element => (
  <SafeAreaView style={styles.safeArea}>
    {scroll ? (
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    ) : (
      <View style={styles.content}>{children}</View>
    )}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flexGrow: 1,
    padding: spacing.md,
    gap: spacing.md
  }
});
