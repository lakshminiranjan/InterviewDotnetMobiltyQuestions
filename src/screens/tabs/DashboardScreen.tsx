import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { StatCard } from '@/components/StatCard';
import { colors, radii, spacing } from '@/constants/theme';
import { useFinanceData } from '@/hooks/useFinanceData';
import type { RootStackParamList } from '@/types/navigation';
import { formatCurrency } from '@/utils/format';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const DashboardScreen = (): JSX.Element => {
  const { userId } = useAuth();
  const navigation = useNavigation<Navigation>();
  const { metrics } = useFinanceData(userId ?? undefined);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Good day 👋</Text>
        <Text style={styles.subtitle}>Here is your monthly money snapshot.</Text>
      </View>
      <StatCard title="Total EMI (Monthly)" value={formatCurrency(metrics.totalEmiMonthly)} />
      <StatCard
        title="Total Subscription (Monthly)"
        value={formatCurrency(metrics.totalSubscriptionMonthly)}
      />
      <StatCard title="Upcoming payments (next 7 days)" value={String(metrics.upcomingPayments)} />
      <View style={styles.quickActions}>
        <AppButton label="View Reports" variant="ghost" onPress={() => navigation.navigate('Reports')} />
        <AppButton
          label="Notifications"
          variant="ghost"
          onPress={() => navigation.navigate('NotificationHistory')}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.primary,
    gap: 6
  },
  title: { fontSize: 26, fontWeight: '800', color: colors.surface },
  subtitle: { color: '#DCEBFF' },
  quickActions: { gap: spacing.sm }
});
