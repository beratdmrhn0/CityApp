import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu.',
    };
  }

  componentDidCatch(error: unknown) {
    // Prod'da burada crash reporting (Sentry vb.) yapılabilir.
    // console.error(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-2xl font-extrabold text-slate-900">Bir hata oluştu</Text>
        <Text className="mt-3 text-center text-slate-500">{this.state.message}</Text>
        <Pressable
          accessibilityRole="button"
          className="mt-6 rounded-2xl bg-blue-600 px-5 py-3"
          onPress={() => this.setState({ hasError: false, message: undefined })}
        >
          <Text className="text-white font-semibold">Tekrar Dene</Text>
        </Pressable>
      </View>
    );
  }
}

