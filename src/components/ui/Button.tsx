import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  loading?: boolean;
  variant?: ButtonVariant;
};

function getClassName(variant: ButtonVariant, disabled: boolean) {
  const base =
    'h-12 w-full flex-row items-center justify-center rounded-2xl px-4 active:opacity-90';
  const state = disabled ? 'opacity-50' : 'opacity-100';

  switch (variant) {
    case 'secondary':
      return `${base} ${state} bg-white border border-slate-200`;
    case 'ghost':
      return `${base} ${state} bg-transparent`;
    case 'primary':
    default:
      return `${base} ${state} bg-blue-600`;
  }
}

function getTextClassName(variant: ButtonVariant) {
  switch (variant) {
    case 'secondary':
      return 'text-slate-900 font-semibold';
    case 'ghost':
      return 'text-blue-600 font-semibold';
    case 'primary':
    default:
      return 'text-white font-semibold';
  }
}

export function Button({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={getClassName(variant, isDisabled)}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2563EB'} />
      ) : (
        <Text className={getTextClassName(variant)}>{title}</Text>
      )}
    </Pressable>
  );
}

