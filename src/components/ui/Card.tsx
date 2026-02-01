import React from 'react';
import { View, ViewProps } from 'react-native';

export type CardProps = ViewProps & {
  variant?: 'surface' | 'soft';
};

export function Card({ variant = 'surface', className, ...props }: CardProps) {
  const base = 'rounded-2xl p-4';
  const bg = variant === 'surface' ? 'bg-white' : 'bg-white/90';

  return <View className={[base, bg, className].filter(Boolean).join(' ')} {...props} />;
}

