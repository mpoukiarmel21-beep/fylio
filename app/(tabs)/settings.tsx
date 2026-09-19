/**
 * Écran Paramètres — contenu défini dans le plan d'architecture §4.6
 *
 * - Profil : avatar, nom d'appareil, numéro Fylio
 * - Langue : 7 langues avec drapeaux + option "Automatique"
 * - Apparence : clair / sombre / système
 * - Transferts, appareils enregistrés, notifications, stockage
 * - À propos
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
import { colors, spacing, radius, typography, shadow } from '@/src/theme';

const characterAvatar = require('@/assets/images/characters/personage6.png');

const languages = [
  { code: 'auto', flag: '🌐', name: 'Automatique' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  { code: 'pt', flag: '🇧🇷', name: 'Português' },
];

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profil */}
      <View style={[styles.profileCard, shadow.card]}>
        <Image source={characterAvatar} style={styles.avatar} />
        <View>
          <Text style={styles.deviceName}>iPhone d'Armel</Text>
          <Text style={styles.fylioNumber}>Fylio-4827 · iOS</Text>
        </View>
      </View>

      {/* Langue */}
      <Text style={styles.sectionTitle}>🌐 Langue</Text>
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>
          Fylio se traduit automatiquement selon la langue de votre téléphone.
        </Text>
        <View style={styles.languageGrid}>
          {languages.map((lang) => (
            <TouchableOpacity key={lang.code} style={styles.languageItem}>
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text style={styles.languageName}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Apparence */}
      <Text style={styles.sectionTitle}>🎨 Apparence</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Mode clair</Text>
          <Text style={styles.rowValue}>○</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Mode sombre</Text>
          <Text style={styles.rowValue}>○</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Suivre le système</Text>
          <Text style={styles.rowValue}>●</Text>
        </TouchableOpacity>
      </View>

      {/* Transferts */}
      <Text style={styles.sectionTitle}>📤 Transferts</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Mode auto (appareils de confiance)</Text>
          <Text style={styles.rowValue}>○</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Effacer l'historique</Text>
          <Text style={styles.rowValue}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Appareils enregistrés */}
      <Text style={styles.sectionTitle}>📱 Appareils enregistrés</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Gérer les appareils</Text>
          <Text style={styles.rowValue}>›</Text>
        </TouchableOpacity>
      </View>

      {/* À propos */}
      <Text style={styles.sectionTitle}>ℹ️ À propos</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Version</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Confidentialité</Text>
          <Text style={styles.rowValue}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Licences open source</Text>
          <Text style={styles.rowValue}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    margin: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    marginRight: spacing.sm,
  },
  deviceName: {
    ...typography.h3,
    color: colors.text,
  },
  fylioNumber: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.sm,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    padding: spacing.sm,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.xs,
  },
  languageItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageName: {
    ...typography.caption,
    color: colors.text,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    ...typography.body,
    color: colors.text,
  },
  rowValue: {
    ...typography.body,
    color: colors.primary,
  },
});
