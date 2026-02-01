import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { citiesMock } from '@/mocks/cities';
import { secureStorage } from '@/services/storage/secure';
import type { City } from '@/types/city';
import { STORAGE_KEYS } from '@/utils/constants';

type Category = {
  key:
    | 'general'
    | 'livingCost'
    | 'districts'
    | 'transport'
    | 'places'
    | 'practical'
    | 'community';
  title: string;
  subtitle: string;
  icon: string;
  onPress: (city: City) => void;
};

export default function ExploreScreen() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const stored = await secureStorage.getItem(STORAGE_KEYS.selectedCityId);
        if (!alive) return;
        setSelectedCityId(stored);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const city = useMemo(() => citiesMock.find((c) => c.id === selectedCityId) ?? null, [selectedCityId]);

  useEffect(() => {
    if (!loading && !selectedCityId) {
      router.replace('/city-selection');
    }
  }, [loading, selectedCityId]);

  const categories: Category[] = useMemo(
    () => [
      {
        key: 'general',
        title: 'Genel Bilgiler',
        subtitle: 'Tarih ve kültür mirası',
        icon: 'ℹ️',
        onPress: (city) => router.push(`/(main)/city/${city.id}/general`),
      },
      {
        key: 'livingCost',
        title: 'Yaşam Maliyeti',
        subtitle: 'Fiyatlar ve aylık bütçe',
        icon: '💳',
        onPress: (city) => router.push(`/(main)/city/${city.id}/living-cost`),
      },
      {
        key: 'districts',
        title: 'Semtler',
        subtitle: 'En popüler bölgeler',
        icon: '📍',
        onPress: (city) => router.push(`/(main)/city/${city.id}/districts`),
      },
      {
        key: 'transport',
        title: 'Ulaşım',
        subtitle: 'Ağlar ve kart sistemleri',
        icon: '🚌',
        onPress: (city) => router.push(`/(main)/city/${city.id}/transport`),
      },
      {
        key: 'places',
        title: 'Gezilecek Yerler',
        subtitle: 'Müzeler, parklar, tarihi yerler',
        icon: '🏛️',
        onPress: (city) => router.push(`/(main)/city/${city.id}/places`),
      },
      {
        key: 'practical',
        title: 'Pratik Bilgiler',
        subtitle: 'Resmi kayıt ve sağlık',
        icon: '🧾',
        onPress: (city) => router.push(`/(main)/city/${city.id}/practical`),
      },
      {
        key: 'community',
        title: 'Topluluk',
        subtitle: 'Yeni taşınanlara öneriler',
        icon: '💬',
        onPress: (city) => router.push(`/(main)/city/${city.id}/community`),
      },
    ],
    [],
  );

  if (loading || !city) {
    return <View className="flex-1 bg-white" />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-slate-900">{city.name}</Text>
          <Pressable
            accessibilityRole="button"
            className="h-10 w-10 items-center justify-center rounded-full bg-slate-100"
            onPress={() => router.push('/city-selection')}
          >
            <Text className="text-slate-700">🔎</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} className="mt-4">
        <View className="px-4">
          <ImageBackground
            source={{ uri: city.heroImageUrl }}
            resizeMode="cover"
            className="h-44 overflow-hidden rounded-3xl"
          >
            <View className="flex-1 justify-end bg-slate-950/35 p-4">
              <Text className="text-xs font-semibold text-orange-200">TÜRKİYE'NİN KALBİ</Text>
              <Text className="mt-1 text-2xl font-extrabold text-white">{city.name}'a Hoş Geldiniz</Text>
            </View>
          </ImageBackground>

          <View className="mt-4 flex-row gap-3">
            <Card className="flex-1">
              <Text className="text-xs text-slate-500">Hava Durumu</Text>
              <Text className="mt-2 text-lg font-extrabold text-slate-900">
                {city.temperatureC ?? '--'}°C, {city.weatherLabel ?? '—'}
              </Text>
            </Card>
            <Card className="flex-1">
              <Text className="text-xs text-slate-500">Nüfus</Text>
              <Text className="mt-2 text-lg font-extrabold text-slate-900">{city.populationLabel ?? '—'}</Text>
            </Card>
          </View>
        </View>

        <View className="mt-6 px-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-slate-900">Şehir Rehberi</Text>
            <Pressable accessibilityRole="button" onPress={() => router.push('/(main)/coming-soon?title=Tümü')}>
              <Text className="text-sm font-semibold text-blue-600">Tümünü Gör</Text>
            </Pressable>
          </View>

          <View className="mt-4 flex-row flex-wrap gap-3">
            {categories.map((c) => (
              <Pressable
                key={c.key}
                accessibilityRole="button"
                className="w-[48%]"
                onPress={() => c.onPress(city)}
              >
                <Card className="gap-2">
                  <Text className="text-lg">{c.icon}</Text>
                  <Text className="text-sm font-bold text-slate-900">{c.title}</Text>
                  <Text className="text-xs text-slate-500">{c.subtitle}</Text>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

