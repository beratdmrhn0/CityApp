import type { District } from '@/types/district';

export const districtsMock: District[] = [
  {
    id: 'besiktas',
    cityId: 'istanbul',
    name: 'Beşiktaş',
    subtitle: 'Canlı, merkezi ve ulaşımı kolay bir atmosfer.',
    priceRangeLabel: '25.000₺ - 45.000₺',
    tags: ['Merkez', 'Luks'],
    imageUrl:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'bahcesehir',
    cityId: 'istanbul',
    name: 'Bahçeşehir',
    subtitle: 'Sakin, düzenli ve yeşil alanlarla bilinir.',
    priceRangeLabel: '20.000₺ - 35.000₺',
    tags: ['AileDostu', 'Sakin'],
    imageUrl:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'kadikoy',
    cityId: 'istanbul',
    name: 'Kadıköy',
    subtitle: 'Kültürel etkinlikler ve genç nüfusla öne çıkar.',
    priceRangeLabel: '18.000₺ - 40.000₺',
    tags: ['OgrenciDostu', 'Kulturel'],
    imageUrl:
      'https://images.unsplash.com/photo-1520975693411-173d7cf2c74a?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'bebek',
    cityId: 'istanbul',
    name: 'Bebek',
    subtitle: 'Boğaz manzarası ve seçkin yaşam tarzı.',
    priceRangeLabel: '60.000₺ - 150.000₺',
    tags: ['Luks'],
    imageUrl:
      'https://images.unsplash.com/photo-1500043357865-c6b8827edf2b?auto=format&fit=crop&w=1200&q=70',
  },
];

