/**
 * Layout racine Fylio — Stack principal
 * Route vers : onboarding, onglets (accueil/fichiers/paramètres), transfert
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/src/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/avatar" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/send" options={{ title: 'Envoyer' }} />
        <Stack.Screen name="transfer/receive" options={{ title: 'Recevoir' }} />
        <Stack.Screen name="transfer/progress" options={{ title: 'Transfert en cours' }} />
      </Stack>
    </>
  );
}
