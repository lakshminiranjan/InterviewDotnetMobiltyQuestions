import { Text } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

export const NotificationHistoryScreen = (): JSX.Element => (
  <ScreenContainer>
    <Text>No notifications yet.</Text>
    <Text>Upcoming reminders and payment history will appear here.</Text>
  </ScreenContainer>
);
