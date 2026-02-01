import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { status, user, isGuest, logout } = useAuth();

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <Text className="text-2xl font-extrabold text-slate-900">Profil</Text>

      <Card className="mt-4">
        <Text className="text-xs text-slate-500">Hesap</Text>
        <Text className="mt-2 text-lg font-extrabold text-slate-900">
          {user?.displayName || (isGuest ? 'Misafir' : 'Kullanıcı')}
        </Text>
        <Text className="mt-1 text-sm text-slate-500">{user?.email ?? '—'}</Text>
        <View className="mt-3">
          <Text className="text-xs text-slate-500">
            Durum: <Text className="font-semibold text-slate-700">{status}</Text>
          </Text>
        </View>
      </Card>

      <Card className="mt-4">
        <Text className="text-sm font-bold text-slate-900">Premium</Text>
        <Text className="mt-2 text-sm text-slate-500">
          Premium ile karşılaştırma, detay analizler ve reklamsız deneyim.
        </Text>
        <View className="mt-4">
          <Button title="Premium'a Geç" onPress={() => router.push('/(main)/premium')} />
        </View>
      </Card>

      <View className="mt-6 gap-3">
        {status === 'unauthenticated' ? (
          <>
            <Button title="Giriş Yap" onPress={() => router.push('/(auth)/login')} />
            <Pressable accessibilityRole="button" className="items-center" onPress={() => router.push('/(auth)/register')}>
              <Text className="text-sm font-semibold text-blue-600">Hesabın yok mu? Kayıt Ol</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Button title="Ayarlar" variant="secondary" onPress={() => router.push('/(main)/settings')} />
            <Button
              title="Çıkış Yap"
              variant="secondary"
              onPress={async () => {
                await logout();
                router.replace('/(auth)/login');
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}

