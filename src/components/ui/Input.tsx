import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="w-full">
      {label ? <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text> : null}
      <TextInput
        className={[
          'h-12 w-full rounded-2xl border bg-white px-4 text-slate-900',
          error ? 'border-red-500' : 'border-slate-200',
        ].join(' ')}
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        {...props}
      />
      {error ? <Text className="mt-2 text-xs text-red-600">{error}</Text> : null}
    </View>
  );
}

