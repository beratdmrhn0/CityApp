import type { City } from '@/types/city';

export const citiesMock: City[] = [
  {
    id: 'istanbul',
    name: 'İstanbul',
    region: 'Marmara Bölgesi',
    heroImageUrl:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=70',
    temperatureC: 24,
    weatherLabel: 'Güneşli',
    populationLabel: '15.8 Milyon',
  },
  {
    id: 'ankara',
    name: 'Ankara',
    region: 'İç Anadolu Bölgesi',
    heroImageUrl:
      'https://images.unsplash.com/photo-1616002851412-74b2b0840d7a?auto=format&fit=crop&w=1200&q=70',
    temperatureC: 18,
    weatherLabel: 'Parçalı Bulutlu',
    populationLabel: '5.8 Milyon',
  },
  {
    id: 'izmir',
    name: 'İzmir',
    region: 'Ege Bölgesi',
    heroImageUrl:
      'https://images.unsplash.com/photo-1627839472717-64adf7a37c2a?auto=format&fit=crop&w=1200&q=70',
    temperatureC: 26,
    weatherLabel: 'Açık',
    populationLabel: '4.5 Milyon',
  },
  {
    id: 'antalya',
    name: 'Antalya',
    region: 'Akdeniz Bölgesi',
    heroImageUrl:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=70',
    temperatureC: 29,
    weatherLabel: 'Güneşli',
    populationLabel: '2.7 Milyon',
  },
  { id: 'bursa', name: 'Bursa', region: 'Marmara Bölgesi' },
  { id: 'adana', name: 'Adana', region: 'Akdeniz Bölgesi' },
  { id: 'gaziantep', name: 'Gaziantep', region: 'Güneydoğu Anadolu Bölgesi' },
  { id: 'konya', name: 'Konya', region: 'İç Anadolu Bölgesi' },
  { id: 'mersin', name: 'Mersin', region: 'Akdeniz Bölgesi' },
  { id: 'trabzon', name: 'Trabzon', region: 'Karadeniz Bölgesi' },
];

