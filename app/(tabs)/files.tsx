/**
 * Écran Fichiers — reproduction fidèle de la maquette
 * D:\FYLIO\PAGES\Pages Fichers\1-Pages Fichers.png
 *
 * - Personnage en haut (élément 2)
 * - Icônes dossiers des appareils (élément 3)
 * - Catégories : Galerie, Musique, Documents, Téléchargements
 * - Reçus / Envoyés
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography, shadow } from '@/src/theme';

const characterTop = require('@/assets/images/characters/personage5.png');

const categories = [
  { id: 'gallery', title: 'Galerie', icon: '🖼️', route: '/gallery' },
  { id: 'music', title: 'Musique', icon: '🎵', route: '/music' },
  { id: 'documents', title: 'Documents', icon: '📄', route: null },
  { id: 'downloads', title: 'Téléchargements', icon: '⬇️', route: null },
];

export default function FilesScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={characterTop} style={styles.character} resizeMode="contain" />
        <Text style={styles.title}>Mes fichiers</Text>
      </View>

      {/* Catégories */}
      <View style={styles.categoryGrid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryCard, shadow.card]}
            activeOpacity={0.85}
            onPress={() => cat.route && router.push(cat.route as never)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryTitle}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dossiers des appareils (élément 3 de la maquette) */}
      <Text style={styles.sectionTitle}>Fichiers reçus par appareil</Text>
      <View style={styles.deviceFolders}>
        {/* TODO Phase 2 : dossiers réels depuis SQLite */}
        <View style={[styles.folderCard, shadow.card]}>
          <Text style={styles.folderIcon}>📱</Text>
          <Text style={styles.folderName}>Fylio-1234 (Android)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  character: {
    width: 80,
    height: 80,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  categoryTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  deviceFolders: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  folderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  folderIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  folderName: {
    ...typography.body,
    color: colors.text,
  },
});
