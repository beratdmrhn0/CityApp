import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <Pressable accessibilityRole="button" onPress={() => router.back()}>
        <Text className="text-blue-600 font-semibold">← Geri</Text>
      </Pressable>

      <Text className="mt-6 text-2xl font-extrabold text-slate-900">Ayarlar</Text>

      <View className="mt-6 gap-3">
        <Card>
          <Text className="font-bold text-slate-900">Dil</Text>
          <Text className="mt-2 text-slate-500 text-sm">Türkçe (TR) (MVP)</Text>
        </Card>
        <Card>
          <Text className="font-bold text-slate-900">Bildirimler</Text>
          <Text className="mt-2 text-slate-500 text-sm">Yakında</Text>
        </Card>
        <Card>
          <Text className="font-bold text-slate-900">Tema</Text>
          <Text className="mt-2 text-slate-500 text-sm">Light (MVP)</Text>
        </Card>
      </View>
    </View>
  );
}

