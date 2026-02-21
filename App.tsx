import { ClerkLoaded, ClerkLoading, ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { AppNavigator } from '@/navigation/AppNavigator';
import { upsertUser } from '@/services/firestore';
import { tokenCache } from '@/services/tokenCache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const UserSync = (): JSX.Element => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;
      await upsertUser({
        id: user.id,
        name: user.fullName ?? 'User',
        email: user.primaryEmailAddress?.emailAddress ?? '',
        premiumStatus: false
      });
    };

    void syncUser();
  }, [isSignedIn, user]);

  return <AppNavigator />;
};

const MissingKeyFallback = (): JSX.Element => (
  <View style={styles.center}>
    <Text style={styles.title}>RupeeTrack</Text>
    <Text style={styles.message}>Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY.</Text>
    <Text style={styles.message}>Create a .env file from .env.example and restart Expo.</Text>
  </View>
);

const App = (): JSX.Element => {
  if (!publishableKey) {
    return <MissingKeyFallback />;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <StatusBar style="dark" />
      <ClerkLoading>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <UserSync />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 24,
    gap: 8
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text
  },
  message: {
    color: colors.subText,
    textAlign: 'center'
  }
});

export default App;
