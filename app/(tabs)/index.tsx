/**
 * Écran d'accueil Fylio — reproduction fidèle de la maquette
 * D:\FYLIO\PAGES\pages d'acceuil\0-pages d'acceuil.png
 *
 * Structure selon INSTRUCTION.txt :
 * - Avatar + nom (haut gauche)
 * - Personnage principal (élément 1) à côté des boutons Envoyer/Recevoir
 * - Bloc "Appareils récents" avec personnage (élément 2) si vide
 * - Bloc "Historique des transferts" avec personnage (élément 3) si vide
 * - Bouton "Voir tout" ouvre la vraie page des appareils
 * - Icônes appareils dynamiques (éléments 5/6/7 : Android/PC/iPhone)
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography, shadow } from '@/src/theme';

// Personnages page d'accueil (selon maquette INSTRUCTION.txt)
const characterMain = require('@/assets/images/characters/accueil-principal.png');
const characterEmptyDevices = require('@/assets/images/characters/accueil-appareils-vide.png');
const characterEmptyHistory = require('@/assets/images/characters/accueil-historique-vide.png');

// Icônes appareils (éléments 5/6/7)
const iconAndroid = require('@/assets/images/icons/device-android.png');
const iconComputer = require('@/assets/images/icons/device-computer.png');
const iconIphone = require('@/assets/images/icons/device-iphone.png');

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const bg = isDark ? colors.dark.background : colors.background;
  const surface = isDark ? colors.dark.surface : colors.surface;
  const text = isDark ? colors.dark.text : colors.text;
  const textSecondary = isDark ? colors.dark.textSecondary : colors.textSecondary;

  // TODO Phase 2 : brancher sur SQLite (appareils récents + historique)
  const hasRecentDevices = false;
  const hasHistory = false;

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} showsVerticalScrollIndicator={false}>
      {/* En-tête : avatar + nom */}
      <View style={styles.header}>
        <Image source={characterMain} style={styles.avatar} />
        <View>
          <Text style={[styles.deviceName, { color: text }]}>iPhone d'Armel</Text>
          <Text style={[styles.fylioNumber, { color: textSecondary }]}>Fylio-4827 · iOS</Text>
        </View>
      </View>

      {/* Boutons principaux Envoyer / Recevoir */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={() => router.push('/transfer/send')}
        >
          <Text style={styles.actionButtonText}>Envoyer</Text>
        </TouchableOpacity>

        <Image source={characterMain} style={styles.characterMain} resizeMode="contain" />

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={() => router.push('/transfer/receive')}
        >
          <Text style={styles.actionButtonText}>Recevoir</Text>
        </TouchableOpacity>
      </View>

      {/* Bloc Appareils récents */}
      <View style={[styles.card, { backgroundColor: surface }, shadow.card]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: text }]}>Appareils récents</Text>
          <TouchableOpacity onPress={() => router.push('/devices')}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {hasRecentDevices ? (
          // Liste dynamique avec icônes selon plateforme (éléments 5/6/7)
          <View style={styles.deviceList}>
            {/* TODO Phase 2 : mapper les appareils SQLite */}
          </View>
        ) : (
          // État vide avec personnage (élément 2)
          <View style={styles.emptyState}>
            <Image source={characterEmptyDevices} style={styles.emptyCharacter} resizeMode="contain" />
            <Text style={[styles.emptyText, { color: textSecondary }]}>
              Aucun appareil récent{'\n'}Effectuez votre premier transfert
            </Text>
          </View>
        )}
      </View>

      {/* Bloc Historique des transferts */}
      <View style={[styles.card, { backgroundColor: surface }, shadow.card]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: text }]}>Historique des transferts</Text>
          <TouchableOpacity onPress={() => router.push('/history')}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {hasHistory ? (
          <View style={styles.historyList}>
            {/* TODO Phase 2 : mapper l'historique SQLite */}
          </View>
        ) : (
          // État vide avec personnage (élément 3)
          <View style={styles.emptyState}>
            <Image source={characterEmptyHistory} style={styles.emptyCharacter} resizeMode="contain" />
            <Text style={[styles.emptyText, { color: textSecondary }]}>
              Aucun transfert pour le moment
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.xl,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    marginRight: spacing.sm,
  },
  deviceName: {
    ...typography.h3,
  },
  fylioNumber: {
    ...typography.caption,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
  characterMain: {
    width: 100,
    height: 100,
    marginHorizontal: spacing.sm,
  },
  card: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.h3,
  },
  seeAll: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  deviceList: {
    gap: spacing.sm,
  },
  historyList: {
    gap: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  emptyCharacter: {
    width: 120,
    height: 120,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
});
