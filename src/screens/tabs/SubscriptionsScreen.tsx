import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radii, shadows, spacing } from '@/constants/theme';
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
          <Text style={styles.value}>{formatCurrency(sub.amount)}</Text>
          <Text style={styles.meta}>
            {sub.category} • Billing day {sub.billingDate}
          </Text>
        </View>
      ))}
      {subscriptions.length === 0 && <Text style={styles.empty}>No subscriptions yet.</Text>}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    gap: 6,
    backgroundColor: colors.surface,
    ...shadows.soft
  },
  name: { fontWeight: '700', fontSize: 16, color: colors.text },
  value: { color: colors.primary, fontWeight: '700' },
  meta: { color: colors.subText },
  empty: { textAlign: 'center', color: colors.subText }
});
