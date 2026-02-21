import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@clerk/clerk-expo';

import { AuthNavigator } from '@/navigation/AuthNavigator';
import { TabNavigator } from '@/navigation/TabNavigator';
import { AddEmiScreen } from '@/screens/stack/AddEmiScreen';
import { AddSubscriptionScreen } from '@/screens/stack/AddSubscriptionScreen';
import { EmiDetailsScreen } from '@/screens/stack/EmiDetailsScreen';
import { NotificationHistoryScreen } from '@/screens/stack/NotificationHistoryScreen';
import { ReportsScreen } from '@/screens/stack/ReportsScreen';
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): JSX.Element => {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AddEmi" component={AddEmiScreen} options={{ title: 'Add EMI' }} />
          <Stack.Screen name="EmiDetails" component={EmiDetailsScreen} options={{ title: 'EMI Details' }} />
          <Stack.Screen
            name="AddSubscription"
            component={AddSubscriptionScreen}
            options={{ title: 'Add Subscription' }}
          />
          <Stack.Screen name="Reports" component={ReportsScreen} />
          <Stack.Screen
            name="NotificationHistory"
            component={NotificationHistoryScreen}
            options={{ title: 'Notification History' }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
