import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

const schema = z
  .object({
    displayName: z.string().trim().min(2, 'İsim en az 2 karakter olmalıdır.').max(40).optional(),
    email: z.string().trim().email('Geçerli bir e-posta girin.'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır.'),
    passwordConfirm: z.string().min(6, 'Şifre tekrarı zorunludur.'),
  })
  .refine((v) => v.password === v.passwordConfirm, {
    message: 'Şifreler eşleşmiyor.',
    path: ['passwordConfirm'],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterScreen() {
  const { status, register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { displayName: '', email: '', password: '', passwordConfirm: '' },
  });

  if (status === 'authenticated' || status === 'guest') {
    return <Redirect href="/(tabs)" />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await register({ email: values.email, password: values.password, displayName: values.displayName || undefined });
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Kayıt olunamadı.');
    }
  });

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <Text className="text-2xl font-extrabold text-slate-900">Hesap Oluştur</Text>
      <Text className="mt-2 text-slate-500">Kısa bir kayıtla başlayalım.</Text>

      <View className="mt-6 gap-4">
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
            <Input
              label="İsim (opsiyonel)"
              placeholder="Ahmet"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={fieldError?.message}
            />
          )}
        />
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
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
            <Input
              label="Şifre Tekrar"
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
        <Button title="Kayıt Ol" loading={isSubmitting} onPress={onSubmit} />

        <Link href="/(auth)/login" asChild>
          <Pressable accessibilityRole="button" className="items-center">
            <Text className="text-sm font-semibold text-slate-600">
              Zaten hesabın var mı? <Text className="text-blue-600">Giriş Yap</Text>
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

