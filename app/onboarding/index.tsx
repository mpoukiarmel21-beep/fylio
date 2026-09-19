/**
 * Onboarding Fylio — Écran 1 : Bienvenue
 * Présentation animée de l'app + personnage en grand plan (élément 4)
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography } from '@/src/theme';

// Élément 4 : personnage en grand plan dès l'ouverture (maquette accueil)
const characterHero = require('@/assets/images/characters/splash-hero.png');

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.heroContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Image source={characterHero} style={styles.heroImage} resizeMode="contain" />
        <Text style={styles.title}>Bienvenue sur Fylio</Text>
        <Text style={styles.subtitle}>
          Transférez vos fichiers rapidement entre tous vos appareils, sans Internet.
        </Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => router.push('/onboarding/avatar')}
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  heroContainer: {
    alignItems: 'center',
  },
  heroImage: {
    width: 240,
    height: 240,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 64,
    borderRadius: radius.full,
  },
  buttonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});
