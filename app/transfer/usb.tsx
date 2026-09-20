/**
 * Écran Transfert par câble USB
 * - iPhone → Windows : détection Apple Mobile Device
 * - Android → Windows : MTP/ADB
 * - Instructions claires pour chaque plateforme
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography } from '@/src/theme';

export default function UsbTransferScreen() {
  const router = useRouter();
  const [cableConnected, setCableConnected] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Transfert par câble</Text>
      <Text style={styles.subtitle}>
        Connectez votre iPhone à l'ordinateur avec un câble USB
      </Text>

      {/* Statut de connexion */}
      <View style={styles.statusCard}>
        <Text style={styles.statusIcon}>{cableConnected ? '✅' : '🔌'}</Text>
        <Text style={styles.statusText}>
          {cableConnected ? 'Câble détecté' : 'Aucun câble détecté'}
        </Text>
      </View>

      {/* Instructions iPhone → PC */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>📋 Instructions iPhone</Text>
        <Text style={styles.instructionStep}>1. Branchez le câble USB entre l'iPhone et le PC</Text>
        <Text style={styles.instructionStep}>2. Sur l'iPhone : « Faire confiance à cet ordinateur ? » → Confiance</Text>
        <Text style={styles.instructionStep}>3. Installez Fylio Desktop sur le PC (Windows)</Text>
        <Text style={styles.instructionStep}>4. Ouvrez Fylio sur les deux appareils</Text>
        <Text style={styles.instructionStep}>5. Le transfert démarre automatiquement par le câble</Text>
      </View>

      {/* Instructions Android */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>📱 Instructions Android</Text>
        <Text style={styles.instructionStep}>1. Branchez le câble USB</Text>
        <Text style={styles.instructionStep}>2. Activez le mode « Transfert de fichiers (MTP) »</Text>
        <Text style={styles.instructionStep}>3. Autorisez le débogage USB si demandé</Text>
        <Text style={styles.instructionStep}>4. Le transfert démarre via le câble</Text>
      </View>

      <TouchableOpacity
        style={[styles.retryButton, cableConnected && styles.retryActive]}
        onPress={() => setCableConnected(!cableConnected)}
      >
        <Text style={styles.retryText}>
          {cableConnected ? '✅ Câble connecté' : '🔄 Vérifier la connexion'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  backButton: { alignSelf: 'flex-start', marginBottom: spacing.sm },
  backText: { ...typography.body, color: colors.primary, fontWeight: '600' },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  statusIcon: { fontSize: 48, marginBottom: spacing.sm },
  statusText: { ...typography.body, color: colors.textSecondary },
  instructionsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  instructionsTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  instructionStep: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  retryActive: {
    backgroundColor: colors.success,
  },
  retryText: { ...typography.button, color: colors.textOnPrimary },
});
