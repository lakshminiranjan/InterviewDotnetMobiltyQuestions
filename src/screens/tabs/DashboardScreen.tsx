import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

import { ScreenContainer } from '@/components/ScreenContainer';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/constants/theme';
import { useFinanceData } from '@/hooks/useFinanceData';
import { formatCurrency } from '@/utils/format';

export const DashboardScreen = (): JSX.Element => {
  const { userId } = useAuth();
  const { metrics } = useFinanceData(userId ?? undefined);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Dashboard</Text>
      <StatCard title="Total EMI (Monthly)" value={formatCurrency(metrics.totalEmiMonthly)} />
      <StatCard
        title="Total Subscription (Monthly)"
        value={formatCurrency(metrics.totalSubscriptionMonthly)}
      />
      <StatCard title="Upcoming payments (next 7 days)" value={String(metrics.upcomingPayments)} />
      <View style={styles.noteBox}>
        <Text style={styles.note}>Tip: Open Reports for EMI vs Subscription pie chart.</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  noteBox: { padding: 14, borderRadius: 12, backgroundColor: '#EFF6FF' },
  note: { color: colors.primary }
});
