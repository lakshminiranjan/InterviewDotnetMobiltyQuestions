export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);

export const calculateEmiProgress = (totalLoan: number, remainingAmount: number): number => {
  if (!totalLoan) return 0;
  return Math.min(100, Math.max(0, ((totalLoan - remainingAmount) / totalLoan) * 100));
};
