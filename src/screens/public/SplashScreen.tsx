import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '@/constants/theme';
import type { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation }: Props): JSX.Element => {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.replace('Onboarding'), 1100);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>₹</Text>
      <Text style={styles.name}>RupeeTrack</Text>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.background
  },
  logo: { color: colors.primary, fontSize: 48, fontWeight: '800' },
  name: { color: colors.text, fontSize: 28, fontWeight: '700' }
});
