/**
 * Onboarding Fylio — Écran 2 : Choix d'avatar
 * 6 personnages recadrés en cercles, contour bleu + fond bleu léger à la sélection
 * Import d'une photo personnelle possible (élément onboarding du brief)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, radius, typography } from '@/src/theme';

const avatars = [
  require('@/assets/images/characters/personage1.png'),
  require('@/assets/images/characters/personage2.png'),
  require('@/assets/images/characters/personage3.png'),
  require('@/assets/images/characters/personage4.png'),
  require('@/assets/images/characters/personage5.png'),
  require('@/assets/images/characters/personage6.png'),
];

export default function AvatarScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState('');

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setCustomPhoto(result.assets[0].uri);
      setSelected(null);
    }
  };

  const continueToPermissions = () => {
    // TODO Phase 2 : sauvegarder avatar + nom dans SecureStore/SQLite
    router.push('/onboarding/permissions');
  };

  const canContinue = (selected !== null || customPhoto !== null) && deviceName.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre avatar</Text>
      <Text style={styles.subtitle}>Ce personnage vous représentera dans Fylio</Text>

      <View style={styles.avatarGrid}>
        {avatars.map((source, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => { setSelected(index); setCustomPhoto(null); }}
            style={[
              styles.avatarCircle,
              selected === index && styles.avatarSelected,
            ]}
          >
            <Image source={source} style={styles.avatarImage} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.photoButton} onPress={pickPhoto}>
        <Text style={styles.photoButtonText}>📷 Importer une photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.nameInput}
        placeholder="Nom de votre appareil (ex : iPhone d'Armel)"
        placeholderTextColor={colors.textSecondary}
        value={deviceName}
        onChangeText={setDeviceName}
      />

      <TouchableOpacity
        style={[styles.continueButton, !canContinue && styles.continueDisabled]}
        disabled={!canContinue}
        onPress={continueToPermissions}
      >
        <Text style={styles.continueText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  avatarSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.skyLight,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  photoButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.lg,
  },
  photoButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  nameInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  continueDisabled: {
    backgroundColor: colors.primaryDisabled,
  },
  continueText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});
