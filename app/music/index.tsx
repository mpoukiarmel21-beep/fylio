/**
 * Écran Musique Fylio — reproduction fidèle de la maquette
 * D:\FYLIO\PAGES\Pages Musique\1-Pages Musique.png
 *
 * - Personnage en haut (élément 2)
 * - Barre de recherche style DA (élément 6)
 * - Playlists (élément 9)
 * - Player en bas avec Play/Pause (éléments 7-8)
 * - État vide : personnage dédié (élément 5) quand aucune musique
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { colors, spacing, radius, typography, shadow } from '@/src/theme';

const characterTop = require('@/assets/images/characters/musique-haut.png');
const characterEmpty = require('@/assets/images/characters/musique-vide.png');

// TODO Phase 5 : lecteur audio réel avec expo-av
const mockPlaylists = [
  { id: 1, title: 'Ma playlist', tracks: 12, color: colors.skyLight },
  { id: 2, title: 'Reçus', tracks: 5, color: colors.skyMedium },
];

export default function MusicScreen() {
  const [search, setSearch] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const hasMusic = mockPlaylists.length > 0;

  return (
    <View style={styles.container}>
      {/* En-tête avec personnage (élément 2) */}
      <View style={styles.header}>
        <Image source={characterTop} style={styles.character} resizeMode="contain" />
        <Text style={styles.title}>Musique</Text>
      </View>

      {/* Barre de recherche (élément 6) */}
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher une musique..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
      />

      {!hasMusic ? (
        // État vide (élément 5)
        <View style={styles.emptyState}>
          <Image source={characterEmpty} style={styles.emptyCharacter} resizeMode="contain" />
          <Text style={styles.emptyText}>Aucune musique détectée dans votre appareil</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Playlists (élément 9) */}
          <Text style={styles.sectionTitle}>Playlists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.playlistRow}>
              {mockPlaylists.map((pl) => (
                <TouchableOpacity key={pl.id} style={[styles.playlistCard, shadow.card]}>
                  <View style={[styles.playlistArt, { backgroundColor: pl.color }]}>
                    <Text style={styles.playlistIcon}>🎵</Text>
                  </View>
                  <Text style={styles.playlistTitle}>{pl.title}</Text>
                  <Text style={styles.playlistCount}>{pl.tracks} titres</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      )}

      {/* Player en bas (éléments 7-8) */}
      {isPlaying && (
        <View style={styles.playerBar}>
          <TouchableOpacity onPress={() => setIsPlaying(false)}>
            <Text style={styles.playerIcon}>⏸</Text>
          </TouchableOpacity>
          <View style={styles.playerInfo}>
            <Text style={styles.playerTitle}>Titre en cours</Text>
            <View style={styles.playerProgress}>
              <View style={[styles.playerProgressFill, { width: '40%' }]} />
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.playerIcon}>⏭</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  character: {
    width: 48,
    height: 48,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  searchBar: {
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCharacter: {
    width: 140,
    height: 140,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  playlistRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  playlistCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    width: 140,
  },
  playlistArt: {
    width: '100%',
    height: 100,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  playlistIcon: {
    fontSize: 40,
  },
  playlistTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  playlistCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  playerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    margin: spacing.md,
  },
  playerIcon: {
    fontSize: 24,
    marginHorizontal: spacing.sm,
  },
  playerInfo: {
    flex: 1,
  },
  playerTitle: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
  },
  playerProgress: {
    height: 4,
    backgroundColor: colors.skyLight,
    borderRadius: radius.full,
    marginTop: 4,
  },
  playerProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
});
