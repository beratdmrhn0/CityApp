import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ComingSoonScreen() {
  const { title } = useLocalSearchParams<{ title?: string }>();

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <Pressable accessibilityRole="button" onPress={() => router.back()}>
        <Text className="text-blue-600 font-semibold">← Geri</Text>
      </Pressable>

      <Text className="mt-6 text-2xl font-extrabold text-slate-900">{title ?? 'Yakında'}</Text>
      <Text className="mt-2 text-slate-500">
        Bu ekran Faz 4'te detaylı olarak geliştirilecek.
      </Text>
    </View>
  );
}

