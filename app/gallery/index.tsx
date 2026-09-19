/**
 * Écran Galerie Fylio — reproduction fidèle de la maquette
 * D:\FYLIO\PAGES\Pages Galerie\1-Pages Galerie.png
 *
 * - Personnages en haut à gauche et à droite (éléments 2 et 3)
 * - État vide : personnage dédié (élément 4) quand aucune vidéo/photo détectée
 * - Grille de photos/vidéos de la bibliothèque
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import { colors, spacing, radius, typography } from '@/src/theme';

// Type compatible avec les deux versions de l'API MediaLibrary
type MediaAsset = { id: string; uri: string };

const characterLeft = require('@/assets/images/characters/galerie-gauche.png');
const characterRight = require('@/assets/images/characters/galerie-droite.png');
const characterEmpty = require('@/assets/images/characters/galerie-vide.png');

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - spacing.md * 3) / 3;

export default function GalleryScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState<MediaAsset[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        const result = await MediaLibrary.getAssetsAsync({
          mediaType: ['photo', 'video'],
          first: 100,
          sortBy: 'creationTime',
        });
        setPhotos(result.assets.map((a) => ({ id: a.id, uri: a.uri })));
      }
    })();
  }, []);

  const renderPhoto = ({ item }: { item: MediaAsset }) => (
    <TouchableOpacity
      onPress={() => {
        // Ouvre le lecteur réel : vidéo pour les vidéos, PDF/image pour le reste
        router.push({
          pathname: '/video/[uri]',
          params: { uri: item.uri, title: item.id },
        });
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.photoItem}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* En-tête avec personnages (éléments 2 et 3) */}
      <View style={styles.header}>
        <Image source={characterLeft} style={styles.characterLeft} resizeMode="contain" />
        <Text style={styles.title}>Galerie</Text>
        <Image source={characterRight} style={styles.characterRight} resizeMode="contain" />
      </View>

      {hasPermission === false ? (
        <View style={styles.emptyState}>
          <Image source={characterEmpty} style={styles.emptyCharacter} resizeMode="contain" />
          <Text style={styles.emptyText}>Permission photos requise</Text>
        </View>
      ) : photos.length === 0 ? (
        // État vide (élément 4)
        <View style={styles.emptyState}>
          <Image source={characterEmpty} style={styles.emptyCharacter} resizeMode="contain" />
          <Text style={styles.emptyText}>Aucune vidéo ou photo détectée</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderPhoto}
          numColumns={3}
          contentContainerStyle={styles.grid}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  characterLeft: {
    width: 48,
    height: 48,
  },
  characterRight: {
    width: 48,
    height: 48,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  grid: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  photoItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
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
});
