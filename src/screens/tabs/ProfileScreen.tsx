import { StyleSheet, Text, View } from 'react-native';
import { useClerk, useUser } from '@clerk/clerk-expo';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';

export const ProfileScreen = (): JSX.Element => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.name}>{user?.fullName ?? 'User'}</Text>
        <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <AppButton label="Logout" onPress={() => void signOut()} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: { padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 6 },
  name: { fontSize: 20, fontWeight: '700' }
});
