import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { citiesMock } from '@/mocks/cities';
import { livingCostMockByCityId } from '@/mocks/livingCost';

function formatTry(amount: number) {
  return new Intl.NumberFormat('tr-TR').format(amount) + ' ₺';
}

function TabPill({
  active,
  title,
  onPress,
}: {
  active: boolean;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      className={[
        'flex-1 rounded-full px-4 py-2 items-center',
        active ? 'bg-white shadow-sm' : 'bg-transparent',
      ].join(' ')}
      onPress={onPress}
    >
      <Text className={active ? 'text-slate-900 font-semibold' : 'text-slate-500 font-semibold'}>
        {title}
      </Text>
    </Pressable>
  );
}

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <View className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <View style={{ width: `${safe}%`, backgroundColor: color }} className="h-2 rounded-full" />
    </View>
  );
}

export default function LivingCostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<'data' | 'compare'>('data');

  const city = useMemo(() => citiesMock.find((c) => c.id === id) ?? null, [id]);
  const data = useMemo(() => livingCostMockByCityId[id], [id]);

  if (!city || !data) {
    return (
      <View className="flex-1 bg-white px-6 pt-14">
        <Pressable accessibilityRole="button" onPress={() => router.back()}>
          <Text className="text-blue-600 font-semibold">← Geri</Text>
        </Pressable>
        <Text className="mt-6 text-slate-900 font-bold">Veri bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14">
        <View className="flex-row items-center justify-between">
          <Pressable accessibilityRole="button" onPress={() => router.back()}>
            <Text className="text-blue-600 font-semibold">←</Text>
          </Pressable>
          <Text className="text-base font-bold text-slate-900">Yaşam Maliyeti</Text>
          <Pressable accessibilityRole="button" onPress={() => {}}>
            <Text className="text-slate-700">⤴︎</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 mt-4">
          <Text className="text-2xl font-extrabold text-slate-900">{city.name}'da Yaşam</Text>
          <Text className="mt-1 text-xs text-slate-500">{data.updatedAtLabel}</Text>
          <Text className="mt-3 text-sm text-slate-500">{data.averageNote}</Text>

          <View className="mt-4 rounded-full bg-slate-100 p-1 flex-row">
            <TabPill active={tab === 'data'} title="Şehir Verileri" onPress={() => setTab('data')} />
            <TabPill active={tab === 'compare'} title="Karşılaştırma" onPress={() => setTab('compare')} />
          </View>

          {tab === 'compare' ? (
            <Card className="mt-4">
              <Text className="text-slate-900 font-bold">Karşılaştırma</Text>
              <Text className="mt-2 text-slate-500 text-sm">
                Premium ile şehir karşılaştırma Faz 5'te eklenecek.
              </Text>
            </Card>
          ) : (
            <View className="mt-4 gap-3">
              {data.items.map((item) => {
                const deltaColor =
                  item.deltaType === 'negative'
                    ? '#10B981'
                    : item.deltaType === 'positive'
                      ? '#EF4444'
                      : '#64748B';
                const barColor =
                  item.id === 'rent'
                    ? '#2563EB'
                    : item.id === 'grocery'
                      ? '#F97316'
                      : item.id === 'transport'
                        ? '#3B82F6'
                        : '#EAB308';

                return (
                  <Card key={item.id} className="gap-2">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                          <Text>{item.icon}</Text>
                        </View>
                        <View className="ml-3">
                          <Text className="font-bold text-slate-900">{item.title}</Text>
                          <Text className="text-xs text-slate-500">{item.subtitle}</Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="font-extrabold text-slate-900">{formatTry(item.amountTry)}</Text>
                        <Text style={{ color: deltaColor }} className="text-xs font-semibold">
                          {item.deltaLabel}
                        </Text>
                      </View>
                    </View>
                    <ProgressBar percent={item.percent} color={barColor} />
                  </Card>
                );
              })}

              <Card className="mt-2">
                <Text className="text-xs text-slate-500">Toplam Tahmini Gider</Text>
                <Text className="mt-2 text-3xl font-extrabold text-blue-600">
                  {formatTry(data.totalMonthlyTry)}
                </Text>
                <Text className="mt-2 text-xs text-slate-500">
                  Bu miktar, bir bireyin kira dahil ortalama yaşam maliyetini temsil eder.
                </Text>
                <View className="mt-4">
                  <Button title="Kendi Bütçeni Hesapla" onPress={() => router.push('/(main)/coming-soon?title=Bütçe%20Hesapla')} />
                </View>
              </Card>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

