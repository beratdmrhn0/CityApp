import React from 'react';
import { Text, TextProps } from 'react-native';

export type AppTextProps = TextProps & {
  variant?: 'title' | 'heading' | 'body' | 'caption';
};

export function AppText({ variant = 'body', className, ...props }: AppTextProps) {
  const base = 'text-slate-900';
  const styleByVariant =
    variant === 'title'
      ? 'text-3xl font-extrabold'
      : variant === 'heading'
        ? 'text-xl font-bold'
        : variant === 'caption'
          ? 'text-xs text-slate-500'
          : 'text-base';

  return <Text className={[base, styleByVariant, className].filter(Boolean).join(' ')} {...props} />;
}

