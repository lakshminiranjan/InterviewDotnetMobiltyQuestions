import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors } from '@/constants/theme';
import type { AuthStackParamList } from '@/types/navigation';

const slides = [
  'Track all EMIs with clear due dates.',
  'Manage subscriptions and monthly spending.',
  'Get payment visibility and reminders in one app.'
];

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export const OnboardingScreen = ({ navigation }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);

  const onNext = () => {
    if (index === slides.length - 1) {
      navigation.replace('Login');
      return;
    }
    setIndex((prev) => prev + 1);
  };

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Welcome to RupeeTrack</Text>
        <Text style={styles.text}>{slides[index]}</Text>
        <AppButton label={index === slides.length - 1 ? 'Get Started' : 'Next'} onPress={onNext} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', gap: 18 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  text: { color: colors.subText, fontSize: 16, lineHeight: 24 }
});
