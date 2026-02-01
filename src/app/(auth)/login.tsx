import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().trim().email('Geçerli bir e-posta girin.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır.'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginScreen() {
  const { status, login, loginAsGuest } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  if (status === 'authenticated' || status === 'guest') {
    return <Redirect href="/(tabs)" />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await login(values.email, values.password);
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Giriş yapılamadı.');
    }
  });

  const onGuest = async () => {
    setError(null);
    try {
      await loginAsGuest();
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Misafir girişi yapılamadı.');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <View className="items-center">
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-400">
          <Text className="text-white text-xl font-extrabold">🏙️</Text>
        </View>
        <Text className="mt-4 text-2xl font-extrabold text-slate-900">Türkiye Şehir Rehberi</Text>
        <Text className="mt-2 text-center text-slate-500">
          Yeni bir şehirde taşınırken veya keşfederken en büyük yardımcınız.
        </Text>
      </View>

      <View className="mt-8 gap-3">
        <Button title="Google ile Devam Et" variant="secondary" onPress={() => setError('MVP: Google girişi yakında.')} />
        <Button title="Apple ile Devam Et" variant="secondary" onPress={() => setError('MVP: Apple girişi yakında.')} />
      </View>

      <View className="mt-6 flex-row items-center">
        <View className="h-px flex-1 bg-slate-200" />
        <Text className="mx-3 text-xs text-slate-500">VEYA</Text>
        <View className="h-px flex-1 bg-slate-200" />
      </View>

      <View className="mt-6 gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
            <Input
              label="E-posta"
              placeholder="ornek@mail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={fieldError?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
            <Input
              label="Şifre"
              placeholder="••••••••"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={fieldError?.message}
            />
          )}
        />

        {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

        <Button title="Giriş Yap" loading={isSubmitting} onPress={onSubmit} />

        <View className="flex-row items-center justify-between">
          <Link href="/(auth)/forgot-password" asChild>
            <Pressable accessibilityRole="button">
              <Text className="text-sm font-semibold text-slate-600">Şifremi unuttum</Text>
            </Pressable>
          </Link>
          <Link href="/(auth)/register" asChild>
            <Pressable accessibilityRole="button">
              <Text className="text-sm font-semibold text-blue-600">Kayıt Ol</Text>
            </Pressable>
          </Link>
        </View>

        <Pressable accessibilityRole="button" className="mt-2 items-center" onPress={onGuest}>
          <Text className="text-sm font-semibold text-slate-600">
            Misafir Olarak Devam Et →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

