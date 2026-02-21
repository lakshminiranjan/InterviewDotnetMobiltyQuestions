import { addDays, getDate, parseISO } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getUserEmis, getUserSubscriptions } from '@/services/firestore';
import type { Emi, Subscription } from '@/types/models';

const isDueWithinWeek = (dueDate: string): boolean => {
  const dueDay = Number(dueDate);
  if (Number.isNaN(dueDay)) return false;

  const now = new Date();
  const currentDay = getDate(now);
  const nextWeekDay = getDate(addDays(now, 7));

  if (nextWeekDay >= currentDay) {
    return dueDay >= currentDay && dueDay <= nextWeekDay;
  }

  return dueDay >= currentDay || dueDay <= nextWeekDay;
};

const isSubscriptionDueWithinWeek = (billingDate: string): boolean => {
  const parsed = Number(billingDate);
  if (!Number.isNaN(parsed)) {
    return isDueWithinWeek(String(parsed));
  }

  try {
    const date = parseISO(billingDate);
    const today = new Date();
    const inWeek = addDays(today, 7);
    return date >= today && date <= inWeek;
  } catch {
    return false;
  }
};

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

    const upcomingEmis = emis.filter((item) => isDueWithinWeek(item.dueDate)).length;
    const upcomingSubscriptions = subscriptions.filter((item) =>
      isSubscriptionDueWithinWeek(item.billingDate)
    ).length;

    return {
      totalEmiMonthly,
      totalSubscriptionMonthly,
      upcomingPayments: upcomingEmis + upcomingSubscriptions
    };
  }, [emis, subscriptions]);

  return { emis, subscriptions, loading, refresh, metrics };
};
