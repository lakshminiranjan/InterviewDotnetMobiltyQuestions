import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors } from '@/constants/theme';
import { useFinanceData } from '@/hooks/useFinanceData';
import type { RootStackParamList } from '@/types/navigation';
import { formatCurrency } from '@/utils/format';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const EmisScreen = (): JSX.Element => {
  const { userId } = useAuth();
  const navigation = useNavigation<Navigation>();
  const { emis } = useFinanceData(userId ?? undefined);

  return (
    <ScreenContainer>
      <AppButton label="Add EMI" onPress={() => navigation.navigate('AddEmi')} />
      {emis.map((emi) => (
        <View key={emi.id} style={styles.card}>
          <Text style={styles.name}>{emi.name}</Text>
          <Text>{formatCurrency(emi.monthlyEmi)}</Text>
          <AppButton label="View Details" variant="secondary" onPress={() => navigation.navigate('EmiDetails', { emiId: emi.id })} />
        </View>
      ))}
      {emis.length === 0 && <Text style={styles.empty}>No EMI found. Add your first EMI.</Text>}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, gap: 8 },
  name: { fontWeight: '700', color: colors.text },
  empty: { textAlign: 'center', color: colors.subText }
});
