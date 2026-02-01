import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

import { citiesMock } from '@/mocks/cities';
import type { City } from '@/types/city';
import { STORAGE_KEYS } from '@/utils/constants';
import { secureStorage } from '@/services/storage/secure';

const popularCityIdSet = new Set(['istanbul', 'ankara', 'izmir', 'antalya']);

function CityRow({ city, onPress }: { city: City; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      className="flex-row items-center justify-between px-4 py-4"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View className="mr-3 h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
          <Text className="text-orange-600 font-bold">{city.name.slice(0, 1).toUpperCase()}</Text>
        </View>
        <View>
          <Text className="text-slate-900 font-semibold">{city.name}</Text>
          <Text className="text-slate-500 text-xs">{city.region}</Text>
        </View>
      </View>
      <Text className="text-slate-400">›</Text>
    </Pressable>
  );
}

export default function CitySelectionScreen() {
  const [query, setQuery] = useState('');

  const popular = useMemo(
    () => citiesMock.filter((c) => popularCityIdSet.has(c.id)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    if (!q) return citiesMock;
    return citiesMock.filter((c) => c.name.toLocaleLowerCase('tr-TR').includes(q));
  }, [query]);

  const selectCity = async (cityId: string) => {
    await secureStorage.setItem(STORAGE_KEYS.selectedCityId, cityId);
    router.replace(`/(tabs)`);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14">
        <Text className="text-center text-base font-bold text-slate-900">Şehir Seçimi</Text>
      </View>

      <View className="mt-4 px-4">
        <View className="rounded-2xl bg-slate-50 p-4">
          <View className="h-24 rounded-xl bg-slate-100 items-center justify-center">
            <Text className="text-slate-500 text-xs">Harita (MVP: placeholder)</Text>
          </View>
        </View>
      </View>

      <View className="mt-4 px-4">
        <View className="h-12 flex-row items-center rounded-2xl border border-slate-200 bg-white px-4">
          <Text className="mr-2 text-slate-400">🔎</Text>
          <TextInput
            className="flex-1 text-slate-900"
            value={query}
            onChangeText={setQuery}
            placeholder="Şehir ara (81 il)..."
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <View className="mt-4 px-4">
        <Text className="text-xs font-semibold text-slate-500">POPÜLER ŞEHİRLER</Text>
        <View className="mt-3 flex-row gap-2">
          {popular.map((c) => (
            <Pressable
              key={c.id}
              className={[
                'rounded-full px-4 py-2',
                c.id === 'istanbul' ? 'bg-blue-600' : 'bg-slate-100',
              ].join(' ')}
              onPress={() => selectCity(c.id)}
            >
              <Text className={c.id === 'istanbul' ? 'text-white font-semibold' : 'text-slate-700'}>
                {c.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="mt-6 px-4">
        <Text className="text-xs font-semibold text-slate-500">TÜM ŞEHİRLER</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CityRow city={item} onPress={() => selectCity(item.id)} />}
        ItemSeparatorComponent={() => <View className="h-px bg-slate-100" />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

