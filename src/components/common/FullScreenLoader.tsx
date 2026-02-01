import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export function FullScreenLoader({ label }: { label?: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <ActivityIndicator />
      {label ? <Text className="mt-3 text-slate-500">{label}</Text> : null}
    </View>
  );
}

