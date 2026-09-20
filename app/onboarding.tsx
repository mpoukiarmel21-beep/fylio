/**
 * Écran Onboarding — premier lancement
 * - Personnage splash en grand
 * - Formulaire : nom + avatar
 */

import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, radius, typography } from '@/src/theme';

const splashCharacter = require('@/assets/images/characters/splash-hero.png');

export default function OnboardingScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const complete = async () => {
    if (!name.trim()) return;
    await AsyncStorage.setItem('user_name', name);
    if (avatarUri) await AsyncStorage.setItem('user_avatar', avatarUri);
    await AsyncStorage.setItem('onboarding_done', 'true');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Image source={splashCharacter} style={styles.hero} resizeMode="contain" />
      <Text style={styles.title}>Bienvenue sur Fylio</Text>
      <TouchableOpacity onPress={pickAvatar} style={styles.avatarPicker}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>📷</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput value={name} onChangeText={setName} placeholder="Votre nom" style={styles.input} placeholderTextColor={colors.textSecondary} />
      <TouchableOpacity onPress={complete} style={[styles.button, !name.trim() && styles.buttonDisabled]} disabled={!name.trim()}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  hero: { width: 200, height: 200, marginBottom: spacing.xl },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.xl },
  avatarPicker: { marginBottom: spacing.lg },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 48 },
  input: { width: '100%', ...typography.body, color: colors.text, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg },
  button: { width: '100%', backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...typography.button, color: colors.textOnPrimary },
});
