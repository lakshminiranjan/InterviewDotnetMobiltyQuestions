import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { createEmi } from '@/services/firestore';
import type { RootStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEmi'>;

export const AddEmiScreen = ({ navigation }: Props): JSX.Element => {
  const { userId } = useAuth();
  const [name, setName] = useState('');
  const [totalLoan, setTotalLoan] = useState('');
  const [monthlyEmi, setMonthlyEmi] = useState('');
  const [dueDate, setDueDate] = useState('5');

  const onSubmit = async () => {
    if (!userId) return;
    await createEmi({
      userId,
      name,
      totalLoan: Number(totalLoan),
      monthlyEmi: Number(monthlyEmi),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      dueDate,
      remainingAmount: Number(totalLoan)
    });
    Alert.alert('Success', 'EMI added');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <AppInput label="EMI name" value={name} onChangeText={setName} />
      <AppInput label="Total loan" value={totalLoan} onChangeText={setTotalLoan} keyboardType="numeric" />
      <AppInput
        label="Monthly EMI"
        value={monthlyEmi}
        onChangeText={setMonthlyEmi}
        keyboardType="numeric"
      />
      <AppInput label="Due date (day)" value={dueDate} onChangeText={setDueDate} keyboardType="numeric" />
      <AppButton label="Save EMI" onPress={() => void onSubmit()} />
    </ScreenContainer>
  );
};
