import { StyleSheet, Text, View } from 'react-native';
import { useClerk, useUser } from '@clerk/clerk-expo';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radii, shadows, spacing } from '@/constants/theme';

export const ProfileScreen = (): JSX.Element => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.name}>{user?.fullName ?? 'User'}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
        <Text style={styles.meta}>Premium: Free Plan</Text>
      </View>
      <AppButton label="Logout" onPress={() => void signOut()} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
    backgroundColor: colors.surface,
    ...shadows.soft
  },
  name: { fontSize: 24, fontWeight: '800', color: colors.text },
  email: { color: colors.subText },
  meta: { color: colors.primary, fontWeight: '600' }
});
