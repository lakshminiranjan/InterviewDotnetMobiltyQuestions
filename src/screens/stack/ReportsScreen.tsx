import { Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAuth } from '@clerk/clerk-expo';

import { ScreenContainer } from '@/components/ScreenContainer';
import { useFinanceData } from '@/hooks/useFinanceData';
import { formatCurrency } from '@/utils/format';

export const ReportsScreen = (): JSX.Element => {
  const { userId } = useAuth();
  const { metrics } = useFinanceData(userId ?? undefined);

  const chartData = [
    {
      name: 'EMI',
      amount: metrics.totalEmiMonthly,
      color: '#1E88E5',
      legendFontColor: '#1E293B',
      legendFontSize: 14
    },
    {
      name: 'Subscriptions',
      amount: metrics.totalSubscriptionMonthly,
      color: '#60A5FA',
      legendFontColor: '#1E293B',
      legendFontSize: 14
    }
  ];

  return (
    <ScreenContainer>
      <Text>Monthly Summary</Text>
      <Text>Total EMI: {formatCurrency(metrics.totalEmiMonthly)}</Text>
      <Text>Total Subscription: {formatCurrency(metrics.totalSubscriptionMonthly)}</Text>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        accessor="amount"
        backgroundColor="transparent"
        chartConfig={{ color: () => '#1E88E5' }}
        paddingLeft="12"
        absolute
      />
    </ScreenContainer>
  );
};
