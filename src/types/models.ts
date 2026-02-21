export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  premiumStatus: boolean;
}

export interface Emi {
  id: string;
  userId: string;
  name: string;
  totalLoan: number;
  monthlyEmi: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  remainingAmount: number;
  createdAt: string;
  lastPaidAt?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  amount: number;
  billingDate: string;
  category: string;
  createdAt: string;
}
