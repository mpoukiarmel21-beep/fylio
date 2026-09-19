/**
 * Écran Recevoir — reproduction fidèle de la maquette QR code
 * D:\FYLIO\PAGES\Pages QR code\1-Pages QR code.png
 *
 * - Nom d'appareil + numéro Fylio
 * - QR code avec personnage en haut et en bas (élément 2 QR)
 * - Demandes entrantes : Accepter / Refuser
 * - Animation d'attente
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { colors, spacing, radius, typography } from '@/src/theme';

// Personnage spécifique QR code (élément 2 maquette QR) — en haut ET en bas
const characterQR = require('@/assets/images/characters/qr-code.png');

export default function ReceiveScreen() {
  const router = useRouter();
  // TODO Phase 2 : payload QR réel (IP + port + clé de session éphémère)
  const qrPayload = JSON.stringify({
    app: 'fylio',
    device: 'Fylio-4827',
    key: 'ephemeral-session-key-v1',
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Image source={characterQR} style={styles.characterTop} resizeMode="contain" />

      <View style={styles.qrCard}>
        <Text style={styles.deviceName}>iPhone d'Armel</Text>
        <Text style={styles.fylioNumber}>Fylio-4827</Text>

        <View style={styles.qrContainer}>
          <QRCode value={qrPayload} size={200} color={colors.text} backgroundColor={colors.surface} />
        </View>

        <Text style={styles.waitingText}>En attente d'une connexion...</Text>
      </View>

      <Image source={characterQR} style={styles.characterBottom} resizeMode="contain" />
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
  characterTop: {
    width: 90,
    height: 90,
    marginBottom: spacing.sm,
  },
  qrCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  deviceName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 4,
  },
  fylioNumber: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  qrContainer: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  waitingText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  characterBottom: {
    width: 90,
    height: 90,
  },
});
