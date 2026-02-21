import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';

import { db } from '@/services/firebase';
import type { Emi, Subscription, UserProfile } from '@/types/models';

export const upsertUser = async (user: Omit<UserProfile, 'createdAt'>): Promise<void> => {
  const userRef = doc(db, 'users', user.id);
  const existing = await getDoc(userRef);
  await setDoc(
    userRef,
    {
      ...user,
      createdAt: existing.exists() ? existing.data().createdAt : serverTimestamp()
    },
    { merge: true }
  );
};

export const createEmi = async (payload: Omit<Emi, 'id' | 'createdAt'>): Promise<void> => {
  await addDoc(collection(db, 'emis'), {
    ...payload,
    createdAt: serverTimestamp()
  });
};

export const getUserEmis = async (userId: string): Promise<Emi[]> => {
  const q = query(collection(db, 'emis'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Emi, 'id'>) }));
};

export const markEmiPaid = async (emiId: string, nextRemainingAmount: number): Promise<void> => {
  await updateDoc(doc(db, 'emis', emiId), {
    remainingAmount: nextRemainingAmount,
    lastPaidAt: new Date().toISOString()
  });
};

export const createSubscription = async (
  payload: Omit<Subscription, 'id' | 'createdAt'>
): Promise<void> => {
  await addDoc(collection(db, 'subscriptions'), {
    ...payload,
    createdAt: serverTimestamp()
  });
};

export const getUserSubscriptions = async (userId: string): Promise<Subscription[]> => {
  const q = query(
    collection(db, 'subscriptions'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Subscription, 'id'>) }));
};
