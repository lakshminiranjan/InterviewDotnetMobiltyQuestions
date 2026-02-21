import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radii, shadows, spacing } from '@/constants/theme';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props): JSX.Element => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (!isLoaded) return;
    try {
      const result = await signIn.create({ identifier: email, password });
      await setActive({ session: result.createdSessionId });
    } catch {
      Alert.alert('Login failed', 'Please check your credentials.');
    }
  };

  const onGoogleLogin = async () => {
    try {
      const response = await startOAuthFlow();
      if (response.createdSessionId) {
        await response.setActive?.({ session: response.createdSessionId });
      }
    } catch {
      Alert.alert('Google Sign-In failed', 'Please try again.');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Welcome back</Text>
        <Text style={styles.title}>Login to RupeeTrack</Text>
        <Text style={styles.subtitle}>Track EMIs, subscriptions, and upcoming dues beautifully.</Text>
      </View>
      <View style={styles.card}>
        <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <AppButton label="Login" onPress={() => void onLogin()} />
        <AppButton label="Continue with Google" variant="secondary" onPress={() => void onGoogleLogin()} />
      </View>
      <View style={styles.row}>
        <Text style={styles.muted}>Don&apos;t have an account? </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  hero: { gap: spacing.xs, marginTop: spacing.lg },
  kicker: { color: colors.primary, fontWeight: '600' },
  title: { fontSize: 30, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.subText, lineHeight: 21 },
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
