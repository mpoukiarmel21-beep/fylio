/**
 * Page Appareils récents ("Voir tout") — fidèle au brief §9
 *
 * - Appareils associés : plateforme, dernière connexion, avatar, méthode
 * - Bouton transfert direct
 * - Supprimer / renommer (menu contextuel)
 * - État en ligne / hors ligne
 * - État vide : animation dédiée avec personnage (élément 2 accueil)
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography, shadow } from '@/src/theme';

const characterEmpty = require('@/assets/images/characters/accueil-appareils-vide.png');
const iconAndroid = require('@/assets/images/icons/device-android.png');
const iconComputer = require('@/assets/images/icons/device-computer.png');
const iconIphone = require('@/assets/images/icons/device-iphone.png');

// TODO Phase 2 : appareils réels depuis SQLite + Zeroconf
const mockDevices: { id: string; name: string; platform: 'android' | 'iphone' | 'computer'; lastSeen: string; online: boolean }[] = [];

function deviceIcon(platform: string) {
  switch (platform) {
    case 'android': return iconAndroid;
    case 'iphone': return iconIphone;
    default: return iconComputer;
  }
}

export default function DevicesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appareils récents</Text>

      {mockDevices.length === 0 ? (
        <View style={styles.emptyState}>
          <Image source={characterEmpty} style={styles.emptyCharacter} resizeMode="contain" />
          <Text style={styles.emptyText}>Aucun appareil récent</Text>
          <Text style={styles.emptySubtext}>
            Les appareils avec lesquels vous avez transféré apparaîtront ici
          </Text>
          <TouchableOpacity
            style={styles.transferButton}
            onPress={() => router.push('/transfer/send')}
          >
            <Text style={styles.transferButtonText}>📤 Faire un premier transfert</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={mockDevices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.deviceRow, shadow.card]}>
              <Image source={deviceIcon(item.platform)} style={styles.deviceIcon} resizeMode="contain" />
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{item.name}</Text>
                <Text style={styles.deviceMeta}>
                  {item.lastSeen} · {item.online ? '🟢 En ligne' : '⚪ Hors ligne'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.directButton}
                onPress={() => router.push('/transfer/send')}
              >
                <Text style={styles.directButtonText}>Transférer</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    padding: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyCharacter: {
    width: 150,
    height: 150,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  transferButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: radius.full,
  },
  transferButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    marginRight: spacing.sm,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  deviceMeta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  directButton: {
    backgroundColor: colors.skyLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.full,
  },
  directButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
});
