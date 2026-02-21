import { useCallback, useEffect, useMemo, useState } from 'react';

import { getUserEmis, getUserSubscriptions } from '@/services/firestore';
import type { Emi, Subscription } from '@/types/models';

export const useFinanceData = (userId?: string) => {
  const [emis, setEmis] = useState<Emi[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [emiData, subscriptionData] = await Promise.all([
        getUserEmis(userId),
        getUserSubscriptions(userId)
      ]);
      setEmis(emiData);
      setSubscriptions(subscriptionData);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const metrics = useMemo(() => {
    const totalEmiMonthly = emis.reduce((sum, item) => sum + Number(item.monthlyEmi || 0), 0);
    const totalSubscriptionMonthly = subscriptions.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    return {
      totalEmiMonthly,
      totalSubscriptionMonthly,
      upcomingPayments: [...emis, ...subscriptions].length
    };
  }, [emis, subscriptions]);

  return { emis, subscriptions, loading, refresh, metrics };
};
