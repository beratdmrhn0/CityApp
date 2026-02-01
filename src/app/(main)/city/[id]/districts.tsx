import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { citiesMock } from '@/mocks/cities';
import { districtsMock } from '@/mocks/districts';
import type { District } from '@/types/district';

type FilterKey = 'All' | 'Luks' | 'AileDostu';

const filterChips: Array<{ key: FilterKey; label: string }> = [
  { key: 'All', label: 'Hepsi' },
  { key: 'Luks', label: 'Lüks' },
  { key: 'AileDostu', label: 'Aile Dostu' },
];

function DistrictCard({ item }: { item: District }) {
  return (
    <Card className="flex-row gap-3">
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} className="h-16 w-16 rounded-2xl bg-slate-100" />
      ) : (
        <View className="h-16 w-16 rounded-2xl bg-slate-100" />
      )}
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-extrabold text-slate-900">{item.name}</Text>
          <Text className="text-xs font-bold text-blue-600">{item.priceRangeLabel}</Text>
        </View>
        {item.subtitle ? <Text className="mt-1 text-xs text-slate-500">{item.subtitle}</Text> : null}
        <View className="mt-2 flex-row flex-wrap gap-2">
          {item.tags.slice(0, 3).map((t) => (
            <View key={t} className="rounded-full bg-slate-100 px-2 py-1">
              <Text className="text-[10px] font-semibold text-slate-600">{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

export default function DistrictsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [filter, setFilter] = useState<FilterKey>('All');

  const city = useMemo(() => citiesMock.find((c) => c.id === id) ?? null, [id]);
  const items = useMemo(() => {
    const byCity = districtsMock.filter((d) => d.cityId === id);
    if (filter === 'All') return byCity;
    return byCity.filter((d) => d.tags.includes(filter));
  }, [id, filter]);

  if (!city) {
    return (
      <View className="flex-1 bg-white px-6 pt-14">
        <Pressable accessibilityRole="button" onPress={() => router.back()}>
          <Text className="text-blue-600 font-semibold">← Geri</Text>
        </Pressable>
        <Text className="mt-6 text-slate-900 font-bold">Şehir bulunamadı.</Text>
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
          <Text className="text-base font-bold text-slate-900">Semtler ve Mahalleler</Text>
          <Pressable accessibilityRole="button" onPress={() => {}}>
            <Text className="text-slate-700">🔎</Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-4 px-4">
        <View className="flex-row gap-2">
          {filterChips.map((c) => {
            const active = filter === c.key;
            return (
              <Pressable
                key={c.key}
                accessibilityRole="button"
                className={[
                  'rounded-full px-4 py-2',
                  active ? 'bg-blue-600' : 'bg-slate-100',
                ].join(' ')}
                onPress={() => setFilter(c.key)}
              >
                <Text className={active ? 'text-white font-semibold' : 'text-slate-700 font-semibold'}>
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text className="mt-4 text-xs font-semibold text-slate-500">
          {city.name} genelinde {items.length} popüler semt
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <Pressable accessibilityRole="button" onPress={() => router.push('/(main)/coming-soon?title=Semt%20Detay')}>
            <DistrictCard item={item} />
          </Pressable>
        )}
      />

      <Pressable
        accessibilityRole="button"
        className="absolute bottom-6 self-center rounded-2xl bg-blue-600 px-6 py-3"
        onPress={() => router.push('/(tabs)/map')}
      >
        <Text className="text-white font-semibold">Haritada Gör</Text>
      </Pressable>
    </View>
  );
}

