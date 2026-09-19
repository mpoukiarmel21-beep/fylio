/**
 * Navigation par onglets Fylio — Accueil / Fichiers / Paramètres
 */

import { Tabs } from 'expo-router';
import { colors } from '@/src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Accueil' }}
      />
      <Tabs.Screen
        name="files"
        options={{ title: 'Fichiers' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Paramètres' }}
      />
    </Tabs>
  );
}
