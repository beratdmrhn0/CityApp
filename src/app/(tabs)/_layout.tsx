import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { useAuth } from '@/hooks/useAuth';

export default function TabsLayout() {
  const { status, hydrating } = useAuth();

  if (status === 'unknown' || hydrating) {
    return null;
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1877F2',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Keşfet' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favoriler' }} />
      <Tabs.Screen name="map" options={{ title: 'Harita' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}

