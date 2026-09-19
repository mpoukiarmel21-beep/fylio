/**
 * Page Historique des transferts — maquette D:\FYLIO\PAGES\Pages Historique de transfert
 *
 * - Liste des transferts passés (envoyés/reçus, fichier, taille, date, appareil)
 * - Personnage dédié (élément 2) quand l'historique est vide
 * - Bouton effacer tout l'historique
 * - "Voir tout" depuis l'accueil ouvre cette vraie page
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, spacing, radius, typography, shadow } from '@/src/theme';

const characterEmpty = require('@/assets/images/characters/empty-history.png');

// TODO Phase 2 : données réelles depuis SQLite (historique des transferts)
const mockHistory: { id: string; name: string; size: string; date: string; device: string; direction: 'sent' | 'received' }[] = [];

export default function HistoryScreen() {
  const clearHistory = () => {
    Alert.alert(
      "Effacer l'historique",
      'Voulez-vous vraiment supprimer tout l\'historique des transferts ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Effacer', style: 'destructive', onPress: () => {/* TODO SQLite */ } },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historique</Text>
        {mockHistory.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearButton}>🗑 Effacer tout</Text>
          </TouchableOpacity>
        )}
      </View>

      {mockHistory.length === 0 ? (
        // État vide avec personnage dédié (élément 2 de la maquette)
        <View style={styles.emptyState}>
          <Image source={characterEmpty} style={styles.emptyCharacter} resizeMode="contain" />
          <Text style={styles.emptyText}>Aucun transfert pour le moment</Text>
          <Text style={styles.emptySubtext}>
            Vos transferts passés apparaîtront ici
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.historyRow, shadow.card]}>
              <Text style={styles.historyIcon}>
                {item.direction === 'sent' ? '📤' : '📥'}
              </Text>
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyMeta}>
                  {item.device} · {item.date} · {item.size}
                </Text>
              </View>
            </View>
          )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  clearButton: {
    ...typography.bodySmall,
    color: colors.error,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCharacter: {
    width: 150,
    height: 150,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  historyIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  historyMeta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
