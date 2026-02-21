import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton } from '@/components/AppButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radii, shadows, spacing } from '@/constants/theme';
import type { AuthStackParamList } from '@/types/navigation';

const slides = [
  'Track every EMI in one timeline with due reminders.',
  'See all your subscriptions and prevent hidden monthly leakage.',
  'Get a beautiful monthly overview and report charts instantly.'
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
        <Text style={styles.badge}>RupeeTrack</Text>
        <Text style={styles.title}>Control your money, elegantly.</Text>
        <View style={styles.card}>
          <Text style={styles.text}>{slides[index]}</Text>
          <Text style={styles.progress}>
            {index + 1} / {slides.length}
          </Text>
        </View>
        <AppButton label={index === slides.length - 1 ? 'Get Started' : 'Next'} onPress={onNext} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', gap: spacing.md },
  badge: { alignSelf: 'flex-start', color: colors.primary, backgroundColor: colors.primarySoft, padding: 8, borderRadius: radii.pill },
  title: { fontSize: 32, fontWeight: '800', color: colors.text, lineHeight: 40 },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
    ...shadows.soft
  },
  text: { color: colors.subText, fontSize: 16, lineHeight: 24 },
  progress: { color: colors.primary, fontWeight: '700' }
});
