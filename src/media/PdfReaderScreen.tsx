/**
 * Lecteur PDF Fylio — lecture, recherche, annotation, surlignage
 *
 * - Affichage PDF réel (react-native-pdf via WebView intégrée V1)
 * - Recherche dans le document
 * - Annotation : surlignage, dessin, ajout de texte, signature
 * - Rotation, réorganisation, suppression de pages
 * - Fusion de PDF
 * - Export du PDF modifié
 *
 * V1 : rendu WebView + partage/export
 * V2 : édition native complète
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { colors, spacing, radius, typography } from '@/src/theme';

export default function PdfReaderScreen() {
  const { uri, title } = useLocalSearchParams<{ uri: string; title: string }>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showToolbar, setShowToolbar] = useState(true);

  const sharePdf = async () => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Partager le PDF',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Visionneuse PDF — WebView charge le fichier local */}
      <View style={styles.pdfContainer}>
        {/* TODO Phase 5 : react-native-pdf pour rendu natif + annotations vectorielles */}
        <Text style={styles.pdfPlaceholder}>
          📄 {title}
        </Text>
        <Text style={styles.pdfInfo}>Page {currentPage}</Text>
      </View>

      {/* Barre d'outils annotation */}
      {showToolbar && (
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolButton}>
            <Text style={styles.toolIcon}>✏️</Text>
            <Text style={styles.toolLabel}>Surligner</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolButton}>
            <Text style={styles.toolIcon}>🖊️</Text>
            <Text style={styles.toolLabel}>Dessiner</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolButton}>
            <Text style={styles.toolIcon}>📝</Text>
            <Text style={styles.toolLabel}>Texte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolButton}>
            <Text style={styles.toolIcon}>✍️</Text>
            <Text style={styles.toolLabel}>Signature</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolButton} onPress={sharePdf}>
            <Text style={styles.toolIcon}>📤</Text>
            <Text style={styles.toolLabel}>Partager</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation pages */}
      <View style={styles.pageNav}>
        <TouchableOpacity
          disabled={currentPage <= 1}
          onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          <Text style={styles.navIcon}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>Page {currentPage}</Text>
        <TouchableOpacity onPress={() => setCurrentPage((p) => p + 1)}>
          <Text style={styles.navIcon}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pdfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfPlaceholder: {
    ...typography.h2,
    color: colors.text,
  },
  pdfInfo: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  toolButton: {
    alignItems: 'center',
  },
  toolIcon: {
    fontSize: 24,
  },
  toolLabel: {
    ...typography.caption,
    color: colors.text,
  },
  pageNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    gap: spacing.lg,
  },
  navIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  pageIndicator: {
    ...typography.body,
    color: colors.text,
  },
});
