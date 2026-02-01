import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { citiesMock } from '@/mocks/cities';

export default function GeneralInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = citiesMock.find((c) => c.id === id);

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <Pressable accessibilityRole="button" onPress={() => router.back()}>
        <Text className="text-blue-600 font-semibold">← Geri</Text>
      </Pressable>

      <Text className="mt-6 text-2xl font-extrabold text-slate-900">
        {city?.name ?? 'Şehir'} Genel Bilgiler
      </Text>
      <Text className="mt-2 text-slate-500">
        Faz 4 kapsamında detaylandırılacak (konum, iklim, şehir karakteri vb.).
      </Text>
    </View>
  );
}

