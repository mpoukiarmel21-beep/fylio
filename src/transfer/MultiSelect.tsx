import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/src/theme';
import { LocalFile } from '@/src/filesystem/LocalFiles';

export default function MultiSelect({ files, selected, onToggle }: { files: LocalFile[]; selected: Set<string>; onToggle: (id: string) => void }) {
  const renderFile = ({ item }: { item: LocalFile }) => {
    const isSelected = selected.has(item.id);
    return (
      <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.fileItem}>
        {item.type === 'video' || item.type === 'photo' ? (
          <Image source={{ uri: item.uri }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.iconThumb]}>
            <Text style={styles.iconText}>{item.type === 'audio' ? '🎵' : item.type === 'document' ? '📄' : '📁'}</Text>
          </View>
        )}
        {isSelected && <View style={styles.badge}><Text style={styles.badgeText}>✓</Text></View>}
      </TouchableOpacity>
    );
  };
  return <FlatList data={files} numColumns={3} keyExtractor={(item) => item.id} renderItem={renderFile} />;
}

const styles = StyleSheet.create({
  fileItem: { flex: 1, margin: 4, aspectRatio: 1, borderRadius: 8, overflow: 'hidden' },
  thumbnail: { width: '100%', height: '100%' },
  iconThumb: { backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 32 },
  badge: { position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: colors.textOnPrimary, fontSize: 14, fontWeight: 'bold' },
});
