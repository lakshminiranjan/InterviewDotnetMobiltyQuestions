import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { createSubscription } from '@/services/firestore';
import type { RootStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddSubscription'>;

export const AddSubscriptionScreen = ({ navigation }: Props): JSX.Element => {
  const { userId } = useAuth();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [billingDate, setBillingDate] = useState('1');
  const [category, setCategory] = useState('Streaming');

  const onSubmit = async () => {
    if (!userId) return;
    await createSubscription({
      userId,
      name,
      amount: Number(amount),
      billingDate,
      category
    });
    Alert.alert('Success', 'Subscription added');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <AppInput label="Name" value={name} onChangeText={setName} />
      <AppInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <AppInput label="Billing day" value={billingDate} onChangeText={setBillingDate} keyboardType="numeric" />
      <AppInput label="Category" value={category} onChangeText={setCategory} />
      <AppButton label="Save Subscription" onPress={() => void onSubmit()} />
    </ScreenContainer>
  );
};
