import { useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useFinanceData } from '@/hooks/useFinanceData';
import { markEmiPaid } from '@/services/firestore';
import type { RootStackParamList } from '@/types/navigation';
import { calculateEmiProgress, formatCurrency } from '@/utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'EmiDetails'>;

export const EmiDetailsScreen = ({ route }: Props): JSX.Element => {
  const { userId } = useAuth();
  const { emis, refresh } = useFinanceData(userId ?? undefined);
  const emi = useMemo(() => emis.find((item) => item.id === route.params.emiId), [emis, route.params.emiId]);

  if (!emi) {
    return (
      <ScreenContainer>
        <Text>EMI not found.</Text>
      </ScreenContainer>
    );
  }

  const onMarkPaid = async () => {
    const next = Math.max(0, emi.remainingAmount - emi.monthlyEmi);
    await markEmiPaid(emi.id, next);
    await refresh();
    Alert.alert('Updated', 'EMI marked as paid.');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>{emi.name}</Text>
      <Text>Total: {formatCurrency(emi.totalLoan)}</Text>
      <Text>Remaining: {formatCurrency(emi.remainingAmount)}</Text>
      <Text>Monthly EMI: {formatCurrency(emi.monthlyEmi)}</Text>
      <View style={styles.progressWrap}>
        <View style={[styles.progress, { width: `${calculateEmiProgress(emi.totalLoan, emi.remainingAmount)}%` }]} />
      </View>
      <AppButton label="Mark as Paid" onPress={() => void onMarkPaid()} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  progressWrap: { height: 12, borderRadius: 999, backgroundColor: '#E2E8F0' },
  progress: { height: 12, borderRadius: 999, backgroundColor: '#1E88E5' }
});
