import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useFinanceData } from '@/hooks/useFinanceData';
import type { RootStackParamList } from '@/types/navigation';
import { formatCurrency } from '@/utils/format';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const SubscriptionsScreen = (): JSX.Element => {
  const { userId } = useAuth();
  const navigation = useNavigation<Navigation>();
  const { subscriptions } = useFinanceData(userId ?? undefined);

  return (
    <ScreenContainer>
      <AppButton label="Add Subscription" onPress={() => navigation.navigate('AddSubscription')} />
      {subscriptions.map((sub) => (
        <View key={sub.id} style={styles.card}>
          <Text style={styles.name}>{sub.name}</Text>
          <Text>{formatCurrency(sub.amount)}</Text>
          <Text>Billing: {sub.billingDate}</Text>
        </View>
      ))}
      {subscriptions.length === 0 && <Text style={styles.empty}>No subscriptions yet.</Text>}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, gap: 6 },
  name: { fontWeight: '700' },
  empty: { textAlign: 'center', color: '#64748B' }
});
