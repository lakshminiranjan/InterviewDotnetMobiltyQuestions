import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { upsertUser } from '@/services/firestore';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export const SignupScreen = ({ navigation }: Props): JSX.Element => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = async () => {
    if (!isLoaded) return;
    try {
      const result = await signUp.create({ firstName: name, emailAddress: email, password });
      await setActive({ session: result.createdSessionId });
      await upsertUser({
        id: result.createdUserId ?? '',
        name,
        email,
        premiumStatus: false
      });
    } catch {
      Alert.alert('Signup failed', 'Please verify details and try again.');
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Create account</Text>
      <AppInput label="Name" value={name} onChangeText={setName} />
      <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AppButton label="Signup" onPress={() => void onSignup()} />
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  row: { flexDirection: 'row' },
  link: { color: '#1E88E5', fontWeight: '600' }
});
