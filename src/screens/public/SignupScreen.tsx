import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radii, shadows, spacing } from '@/constants/theme';
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
      <View style={styles.hero}>
        <Text style={styles.kicker}>Create account</Text>
        <Text style={styles.title}>Join RupeeTrack</Text>
      </View>
      <View style={styles.card}>
        <AppInput label="Name" value={name} onChangeText={setName} />
        <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <AppButton label="Signup" onPress={() => void onSignup()} />
      </View>
      <View style={styles.row}>
        <Text style={styles.muted}>Already have an account? </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  hero: { gap: spacing.xs, marginTop: spacing.lg },
  kicker: { color: colors.primary, fontWeight: '600' },
  title: { fontSize: 30, fontWeight: '800', color: colors.text },
  card: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft
  },
  row: { flexDirection: 'row', justifyContent: 'center' },
  muted: { color: colors.subText },
  link: { color: colors.primary, fontWeight: '700' }
});
