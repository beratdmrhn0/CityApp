import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().trim().email('Geçerli bir e-posta girin.'),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth();
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    setInfo(null);
    try {
      await forgotPassword(values.email);
      setInfo('Şifre sıfırlama bağlantısı (mock) başarıyla oluşturuldu.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'İşlem başarısız.');
    }
  });

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      <Text className="text-2xl font-extrabold text-slate-900">Şifremi Unuttum</Text>
      <Text className="mt-2 text-slate-500">
        E-postanı gir; sıfırlama bağlantısı göndereceğiz (MVP: mock).
      </Text>

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

        {info ? <Text className="text-sm text-green-700">{info}</Text> : null}
        {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

        <Button title="Bağlantı Gönder" loading={isSubmitting} onPress={onSubmit} />

        <Link href="/(auth)/login" asChild>
          <Pressable accessibilityRole="button" className="items-center">
            <Text className="text-sm font-semibold text-slate-600">Geri dön → Giriş</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

