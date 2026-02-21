import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

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

const App = (): JSX.Element => {
  if (!publishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <StatusBar style="dark" />
      <UserSync />
    </ClerkProvider>
  );
};

export default App;
