/**
 * Écran Progression — reproduction fidèle de la maquette transfert
 * D:\FYLIO\PAGES\Pages de Transfert en cours\1-Pages de Transfert en cours.png
 *
 * - Nom, aperçu, taille, vitesse, temps restant, pourcentage
 * - Pause / reprise / annulation
 * - Objet animé (éléments 1-11 : dinosaure, voiture, animal...) qui avance
 *   avec la barre de progression, choisi aléatoirement mais cohérent
 * - Icônes appareils selon le type émetteur/récepteur
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography } from '@/src/theme';

// Animation 11 frames (personnage qui avance selon la progression)
const animationFrames = [
  require('@/assets/images/animations/object-1.png'),
  require('@/assets/images/animations/object-2.png'),
  require('@/assets/images/animations/object-3.png'),
  require('@/assets/images/animations/object-4.png'),
  require('@/assets/images/animations/object-5.png'),
  require('@/assets/images/animations/object-6.png'),
  require('@/assets/images/animations/object-7.png'),
  require('@/assets/images/animations/object-8.png'),
  require('@/assets/images/animations/object-9.png'),
  require('@/assets/images/animations/object-10.png'),
  require('@/assets/images/animations/object-11.png'),
];

const iconIphone = require('@/assets/images/icons/device-iphone.png');
const iconAndroid = require('@/assets/images/icons/device-android.png');

export default function ProgressScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0.35);
  const [isPaused, setIsPaused] = useState(false);

  // Frame animé calculé selon la progression (11 frames → index 0-10)
  const frameIndex = Math.min(10, Math.floor(progress * 10));
  const movingObject = animationFrames[frameIndex];

  // Animation de l'objet qui suit la barre
  const objectPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isPaused) {
      // TODO Phase 2 : brancher sur le vrai moteur de transfert
      const timer = setInterval(() => {
        setProgress((p) => Math.min(1, p + 0.02));
      }, 300);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  useEffect(() => {
    Animated.timing(objectPosition, {
      toValue: progress,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [progress, objectPosition]);

  const translateX = objectPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 280], // largeur de la barre
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.deviceRow}>
        <Image source={iconIphone} style={styles.deviceIcon} resizeMode="contain" />
        <Text style={styles.deviceArrow}>→</Text>
        <Image source={iconAndroid} style={styles.deviceIcon} resizeMode="contain" />
      </View>

      <View style={styles.fileCard}>
        <Text style={styles.fileName}>photo-vacances.jpg</Text>
        <Text style={styles.fileSize}>12.4 Mo sur 35.2 Mo</Text>
      </View>

      {/* Barre de progression avec objet animé */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        <Animated.View style={[styles.movingObject, { transform: [{ translateX }] }]}>
          <Image source={movingObject} style={styles.movingObjectImage} resizeMode="contain" />
        </Animated.View>
      </View>

      <Text style={styles.percentage}>{Math.round(progress * 100)}%</Text>
      <Text style={styles.speed}>2.4 Mo/s · 8 secondes restantes</Text>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.surface }]}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Text style={styles.controlText}>{isPaused ? '▶ Reprendre' : '⏸ Pause'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.error }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.controlText, { color: colors.textOnPrimary }]}>✕ Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: spacing.md,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  deviceIcon: {
    width: 48,
    height: 48,
  },
  deviceArrow: {
    ...typography.h2,
    color: colors.primary,
    marginHorizontal: spacing.md,
  },
  fileCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  fileName: {
    ...typography.h3,
    color: colors.text,
  },
  fileSize: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  progressTrack: {
    width: 300,
    height: 24,
    backgroundColor: colors.skyLight,
    borderRadius: radius.full,
    overflow: 'visible',
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  movingObject: {
    position: 'absolute',
    top: -18,
    left: 0,
  },
  movingObjectImage: {
    width: 60,
    height: 60,
  },
  percentage: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: 4,
  },
  speed: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  controlButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: radius.full,
  },
  controlText: {
    ...typography.button,
    color: colors.text,
  },
});
