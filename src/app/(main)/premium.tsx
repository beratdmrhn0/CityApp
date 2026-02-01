import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type Period = 'monthly' | 'yearly';

export default function PremiumScreen() {
  const [period, setPeriod] = useState<Period>('yearly');

  const priceLabel = useMemo(() => {
    return period === 'yearly' ? '$29.99 / yıllık' : '$4.99 / aylık';
  }, [period]);

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <View className="flex-row items-center justify-between">
        <Pressable accessibilityRole="button" onPress={() => router.back()}>
          <Text className="text-blue-600 font-semibold">←</Text>
        </Pressable>
        <Text className="text-base font-bold text-slate-900">Premium Paketler</Text>
        <View className="w-8" />
      </View>

      <View className="mt-6 items-center">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Text className="text-xl">⭐</Text>
        </View>
        <Text className="mt-4 text-xl font-extrabold text-slate-900">Deneyiminizi Yükseltin</Text>
        <Text className="mt-2 text-center text-slate-500">
          Türkiye'deki yeni yaşamınızı en iyi araçlarla hızlandırın.
        </Text>
      </View>

      <View className="mt-6 flex-row rounded-full bg-slate-100 p-1">
        <Pressable
          accessibilityRole="button"
          className={['flex-1 rounded-full px-4 py-2 items-center', period === 'monthly' ? 'bg-white' : ''].join(' ')}
          onPress={() => setPeriod('monthly')}
        >
          <Text className={period === 'monthly' ? 'font-semibold text-slate-900' : 'font-semibold text-slate-500'}>
            Aylık
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          className={['flex-1 rounded-full px-4 py-2 items-center', period === 'yearly' ? 'bg-white' : ''].join(' ')}
          onPress={() => setPeriod('yearly')}
        >
          <Text className={period === 'yearly' ? 'font-semibold text-slate-900' : 'font-semibold text-slate-500'}>
            Yıllık
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 gap-3">
        {[
          'Detaylı Semt Analizi',
          'Şehir Karşılaştırma',
          'Yaşam Maliyeti Hesaplayıcı',
          'Taşınma Kontrol Listesi',
          'Çevrimdışı Erişim',
          'Reklamsız Deneyim',
        ].map((t) => (
          <Card key={t} className="flex-row items-center justify-between">
            <Text className="text-slate-900 font-semibold">{t}</Text>
            <Text className="text-green-600 font-extrabold">✓</Text>
          </Card>
        ))}
      </View>

      <Card className="mt-6">
        <Text className="text-xs text-slate-500">Seçilen Paket</Text>
        <Text className="mt-2 text-lg font-extrabold text-slate-900">{priceLabel}</Text>
        <Text className="mt-1 text-xs text-slate-500">MVP: ödeme entegrasyonu Faz 6 sonrası.</Text>
      </Card>

      <View className="mt-6">
        <Button title="Premium'a Geç" onPress={() => router.push('/(main)/coming-soon?title=Ödeme')} />
      </View>
    </View>
  );
}

