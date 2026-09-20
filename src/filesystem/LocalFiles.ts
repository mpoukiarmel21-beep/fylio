/**
 * LocalFiles — accès aux vrais fichiers de l'appareil
 * Style SHAREit : affiche tout directement dans Fylio
 */

import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export interface LocalFile {
  id: string;
  uri: string;
  filename: string;
  type: 'video' | 'photo' | 'audio' | 'document' | 'other';
  size: number;
  creationTime: number;
}

export async function getVideos(): Promise<LocalFile[]> {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') return [];
  const result = await MediaLibrary.getAssetsAsync({ mediaType: 'video', first: 500, sortBy: 'creationTime' });
  return result.assets.map((a) => ({ id: a.id, uri: a.uri, filename: a.filename, type: 'video', size: 0, creationTime: a.creationTime }));
}

export async function getPhotos(): Promise<LocalFile[]> {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') return [];
  const result = await MediaLibrary.getAssetsAsync({ mediaType: 'photo', first: 500, sortBy: 'creationTime' });
  return result.assets.map((a) => ({ id: a.id, uri: a.uri, filename: a.filename, type: 'photo', size: 0, creationTime: a.creationTime }));
}

export async function getMusic(): Promise<LocalFile[]> {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') return [];
  const result = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: 500, sortBy: 'creationTime' });
  return result.assets.map((a) => ({ id: a.id, uri: a.uri, filename: a.filename, type: 'audio', size: 0, creationTime: a.creationTime }));
}

export async function pickDocuments(): Promise<LocalFile[]> {
  const result = await DocumentPicker.getDocumentAsync({ type: '*/*', multiple: true });
  if (result.canceled) return [];
  return result.assets.map((a) => ({ id: a.uri, uri: a.uri, filename: a.name, type: 'document', size: a.size || 0, creationTime: Date.now() }));
}
