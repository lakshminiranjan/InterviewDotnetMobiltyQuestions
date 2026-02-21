import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '@/constants/theme';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation }: Props): JSX.Element => {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.replace('Onboarding'), 1200);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RupeeTrack</Text>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#fff' },
  logo: { color: colors.primary, fontSize: 32, fontWeight: '700' }
});
