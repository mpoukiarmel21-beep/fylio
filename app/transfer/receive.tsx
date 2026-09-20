/**
 * Écran Recevoir — reproduction fidèle de la maquette QR code
 * D:\FYLIO\PAGES\Pages QR code\1-Pages QR code.png
 *
 * - Nom d'appareil + numéro Fylio
 * - QR code avec personnage en haut et en bas (élément 2 QR)
 * - Demandes entrantes : Accepter / Refuser
 * - Animation d'attente
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import NetInfo from '@react-native-community/netinfo';
import { colors, spacing, radius, typography } from '@/src/theme';

const characterQR = require('@/assets/images/characters/qr-code.png');

export default function ReceiveScreen() {
  const router = useRouter();
  const [localIP, setLocalIP] = useState<string | null>(null);
  const fylioNumber = 'Fylio-4827'; // TODO Phase 2: récupérer depuis SecureStore

  // Récupère l'IP locale réelle
  useEffect(() => {
    NetInfo.fetch().then((state: any) => {
      if (state.details && 'ipAddress' in state.details) {
        setLocalIP(state.details.ipAddress as string);
      }
    });
  }, []);

  // Payload QR réel : IP + port + numéro Fylio + clé session éphémère
  const qrPayload = JSON.stringify({
    v: 1, // version protocole
    app: 'fylio',
    ip: localIP || '0.0.0.0',
    port: 48123,
    device: fylioNumber,
    key: Math.random().toString(36).substring(7), // clé session temp
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Image source={characterQR} style={styles.characterTop} resizeMode="contain" />

      <View style={styles.qrCard}>
        <Text style={styles.deviceName}>iPhone d'Armel</Text>
        <Text style={styles.fylioNumber}>{fylioNumber}</Text>
        {localIP && <Text style={styles.ipAddress}>IP: {localIP}:48123</Text>}

        <View style={styles.qrContainer}>
          <QRCode value={qrPayload} size={200} color={colors.text} backgroundColor={colors.surface} />
        </View>

        <Text style={styles.waitingText}>
          {localIP ? 'Scannez ce QR code depuis un autre appareil Fylio' : 'Recherche du réseau Wi-Fi...'}
        </Text>
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
  ipAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  characterBottom: {
    width: 90,
    height: 90,
  },
});
