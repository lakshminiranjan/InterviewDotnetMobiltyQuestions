import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '@/constants/theme';
import { DashboardScreen } from '@/screens/tabs/DashboardScreen';
import { EmisScreen } from '@/screens/tabs/EmisScreen';
import { ProfileScreen } from '@/screens/tabs/ProfileScreen';
import { SubscriptionsScreen } from '@/screens/tabs/SubscriptionsScreen';
import type { TabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = (): JSX.Element => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.subText,
      headerStyle: { backgroundColor: colors.background },
      headerShadowVisible: false,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        height: 64,
        paddingBottom: 8,
        paddingTop: 6
      },
      tabBarLabelStyle: { fontWeight: '600' },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
          Dashboard: 'home-outline',
          EMIs: 'wallet-outline',
          Subscriptions: 'refresh-circle-outline',
          Profile: 'person-outline'
        };
        return <Ionicons color={color} size={size} name={icons[route.name]} />;
      }
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="EMIs" component={EmisScreen} />
    <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
