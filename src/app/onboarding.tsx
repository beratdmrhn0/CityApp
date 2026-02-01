import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { STORAGE_KEYS } from '@/utils/constants';
import { secureStorage } from '@/services/storage/secure';

export default function OnboardingScreen() {
  const handleStart = async () => {
    await secureStorage.setItem(STORAGE_KEYS.hasSeenOnboarding, '1');
    router.replace('/city-selection');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70',
      }}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="flex-1 bg-slate-950/60 px-6 pb-10 pt-14">
        <View className="flex-1 items-center justify-center">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <Text className="text-white text-xl font-extrabold">Ş</Text>
          </View>

          <Text className="mt-6 text-4xl font-extrabold text-white">Şehir Rehberi</Text>
          <View className="mt-4 h-1 w-16 rounded-full bg-blue-500" />

          <Text className="mt-8 text-center text-lg font-semibold text-white/90">
            Türkiye'yi Keşfedin
          </Text>
          <Text className="mt-2 text-center text-white/70">
            Yeni şehrinizdeki yaşam, taşınma ve yerel ipuçları için rehberiniz.
          </Text>
        </View>

        <Button title="Hadi Başlayalım →" onPress={handleStart} />

        <Pressable
          accessibilityRole="button"
          className="mt-5 flex-row items-center justify-center"
          onPress={() => {
            // MVP: dil seçimi sonradan eklenecek
          }}
        >
          <Text className="text-white/80">🌐 </Text>
          <Text className="text-white/80">Türkçe (TR)</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

