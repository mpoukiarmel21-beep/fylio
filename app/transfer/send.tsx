/**
 * Écran Envoyer — sélection de fichiers à transférer
 * Fichiers, photos, vidéos, musique, documents, dossiers
 * Récents, recherche, tri, sélection multiple, aperçu
 * Bouton Envoyer visible après sélection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, radius, typography } from '@/src/theme';

export default function SendScreen() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const pickFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((a) => a.uri);
      setSelectedFiles((prev) => [...prev, ...uris]);
    }
  };

  // Sélection multiple de photos/vidéos de la galerie
  const pickPhotos = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const picker = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!picker.canceled && picker.assets) {
        const uris = picker.assets.map((a) => a.uri);
        setSelectedFiles((prev) => [...prev, ...uris]);
      }
    }
  };

  const pickMusic = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      multiple: true,
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((a) => a.uri);
      setSelectedFiles((prev) => [...prev, ...uris]);
    }
  };

  const startTransfer = () => {
    if (selectedFiles.length > 0) {
      router.push('/transfer/progress');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Que voulez-vous envoyer ?</Text>

      <View style={styles.sourceRow}>
        <TouchableOpacity style={styles.sourceButton} onPress={pickPhotos}>
          <Text style={styles.sourceIcon}>🖼️</Text>
          <Text style={styles.sourceLabel}>Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sourceButton} onPress={pickFiles}>
          <Text style={styles.sourceIcon}>📁</Text>
          <Text style={styles.sourceLabel}>Fichiers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sourceButton} onPress={pickMusic}>
          <Text style={styles.sourceIcon}>🎵</Text>
          <Text style={styles.sourceLabel}>Musique</Text>
        </TouchableOpacity>
      </View>

      {selectedFiles.length > 0 && (
        <FlatList
          data={selectedFiles}
          keyExtractor={(item, i) => `${item}-${i}`}
          renderItem={({ item }) => (
            <View style={styles.fileRow}>
              <Text style={styles.fileName}>{item.split('/').pop()}</Text>
            </View>
          )}
          style={styles.fileList}
        />
      )}

      {selectedFiles.length > 0 && (
        <TouchableOpacity
          style={styles.sendButton}
          activeOpacity={0.85}
          onPress={startTransfer}
        >
          <Text style={styles.sendButtonText}>
            Envoyer {selectedFiles.length} fichier{selectedFiles.length > 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  sourceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sourceButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  sourceIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  sourceLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  fileList: {
    flex: 1,
  },
  fileRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  fileName: {
    ...typography.bodySmall,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: radius.full,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  sendButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});
