import type { LivingCostSummary } from '@/types/livingCost';

export const livingCostMockByCityId: Record<string, LivingCostSummary> = {
  istanbul: {
    cityId: 'istanbul',
    updatedAtLabel: 'Güncelleme: Ekim 2023',
    averageNote:
      "Bu miktar, İstanbul'da bir bireyin kira dahil ortalama yaşam maliyetini gösterir.",
    totalMonthlyTry: 31200,
    items: [
      {
        id: 'rent',
        title: 'Kira & Barınma',
        subtitle: 'Merkez • 1+1 Daire',
        amountTry: 18500,
        deltaLabel: '+22% Ortalamadan',
        deltaType: 'positive',
        percent: 70,
        icon: '🏠',
      },
      {
        id: 'grocery',
        title: 'Gıda & Market',
        subtitle: 'Aylık mutfak harcaması',
        amountTry: 7200,
        deltaLabel: '+13% Ortalamadan',
        deltaType: 'positive',
        percent: 45,
        icon: '🛒',
      },
      {
        id: 'transport',
        title: 'Ulaşım',
        subtitle: 'İstanbulkart & yakıt',
        amountTry: 2400,
        deltaLabel: '-5% Ortalamadan',
        deltaType: 'negative',
        percent: 25,
        icon: '🚌',
      },
      {
        id: 'bills',
        title: 'Faturalar',
        subtitle: 'Elektrik, su, internet',
        amountTry: 3100,
        deltaLabel: '+12% Ortalamadan',
        deltaType: 'positive',
        percent: 30,
        icon: '⚡',
      },
    ],
  },
};

