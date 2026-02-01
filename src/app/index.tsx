import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Index() {
  // Expo Go'da native crash olup olmadığını ayırmak için:
  // Bu ekran NativeWind/className kullanmadan en minimal render yapar.
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#0f172a' }}>CityApp çalışıyor ✅</Text>
      <Text style={{ marginTop: 8, color: '#64748b', textAlign: 'center', paddingHorizontal: 24 }}>
        Expo Go senin cihazında çöküyor. Dev build (APK) ile açınca aşağıdaki butonlarla
        gerçek ekranlara geçeceğiz.
      </Text>

      <View style={{ height: 16 }} />

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/onboarding')}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#2563eb',
          borderRadius: 14,
          minWidth: 220,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Onboarding'e Git</Text>
      </Pressable>

      <View style={{ height: 10 }} />

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/(auth)/login')}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#f1f5f9',
          borderRadius: 14,
          minWidth: 220,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#e2e8f0',
        }}
      >
        <Text style={{ color: '#0f172a', fontWeight: '700' }}>Login'e Git</Text>
      </Pressable>
    </View>
  );
}

