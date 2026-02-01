export type LivingCostItem = {
  id: string;
  title: string;
  subtitle: string;
  amountTry: number;
  deltaLabel: string; // e.g. "+22% Ortalamadan"
  deltaType: 'positive' | 'negative' | 'neutral';
  percent: number; // 0..100
  icon: string;
};

export type LivingCostSummary = {
  cityId: string;
  updatedAtLabel: string;
  averageNote: string;
  totalMonthlyTry: number;
  items: LivingCostItem[];
};

