import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAuth } from '@clerk/clerk-expo';

import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radii, shadows, spacing } from '@/constants/theme';
import { useFinanceData } from '@/hooks/useFinanceData';
import { formatCurrency } from '@/utils/format';

export const ReportsScreen = (): JSX.Element => {
  const { userId } = useAuth();
  const { metrics } = useFinanceData(userId ?? undefined);

  const chartData = [
    {
      name: 'EMI',
      amount: Math.max(1, metrics.totalEmiMonthly),
      color: '#0A84FF',
      legendFontColor: '#1E293B',
      legendFontSize: 14
    },
    {
      name: 'Subscriptions',
      amount: Math.max(1, metrics.totalSubscriptionMonthly),
      color: '#62A7FF',
      legendFontColor: '#1E293B',
      legendFontSize: 14
    }
  ];

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Monthly Summary</Text>
        <Text style={styles.item}>Total EMI: {formatCurrency(metrics.totalEmiMonthly)}</Text>
        <Text style={styles.item}>Total Subscription: {formatCurrency(metrics.totalSubscriptionMonthly)}</Text>
      </View>
      <View style={styles.card}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 64}
          height={220}
          accessor="amount"
          backgroundColor="transparent"
          chartConfig={{ color: () => colors.primary }}
          paddingLeft="16"
          absolute
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.soft
  },
  title: { fontWeight: '800', fontSize: 18, color: colors.text, marginBottom: 8 },
  item: { color: colors.subText, marginBottom: 4 }
});
