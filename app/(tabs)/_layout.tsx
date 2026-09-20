/**
 * Navigation par onglets Fylio — 5 onglets selon maquette
 * Tab bar translucide en bas avec icônes
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="files" options={{ title: 'Fichiers', tabBarIcon: ({ color, size }) => <Ionicons name="folder" size={size} color={color} /> }} />
      <Tabs.Screen name="gallery" options={{ title: 'Galerie', tabBarIcon: ({ color, size }) => <Ionicons name="images" size={size} color={color} /> }} />
      <Tabs.Screen name="music" options={{ title: 'Musique', tabBarIcon: ({ color, size }) => <Ionicons name="musical-notes" size={size} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Réglages', tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }} />
    </Tabs>
  );
}
