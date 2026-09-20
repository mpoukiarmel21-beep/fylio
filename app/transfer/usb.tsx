/**
 * Écran Transfert par câble USB — moteur RÉEL
 * - Détection USB via NetInfo (interfaces RNDIS/NCM/Apple)
 * - Mode écoute (réception) ou envoi vers PC
 * - Protocole TCP Fylio par-dessus le câble
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, typography } from '@/src/theme';
import {
  UsbTransferEngine,
  detectUsbConnection,
  UsbConnectionInfo,
} from '@/src/transfer/usb-engine';
import { TransferStatus } from '@/src/transfer/engine';
import { TransferFile } from '@/src/transfer/protocol';

export default function UsbTransferScreen() {
  const router = useRouter();
  const engineRef = React.useRef<UsbTransferEngine | null>(null);
  const [usbInfo, setUsbInfo] = useState<UsbConnectionInfo | null>(null);
  const [status, setStatus] = useState<{ s: TransferStatus; msg?: string } | null>(null);
  const [pcIP, setPcIP] = useState('');
  const [percent, setPercent] = useState(0);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    engineRef.current = new UsbTransferEngine();
    // Détection du câble au chargement + toutes les 2 s
    const check = () => {
      detectUsbConnection().then(setUsbInfo).catch(() => undefined);
    };
    check();
    const interval = setInterval(check, 2000);
    return () => {
      clearInterval(interval);
      engineRef.current?.stopServer();
      engineRef.current = null;
    };
  }, []);

  const startListen = async () => {
    const engine = engineRef.current;
    if (!engine) return;
    setListening(true);
    try {
      await engine.startUsbServer(
        async (device) =>
          new Promise<boolean>((resolve) => {
            Alert.alert(
              'Transfert entrant',
              `${device} veut envoyer des fichiers par câble. Accepter ?`,
              [
                { text: 'Refuser', onPress: () => resolve(false) },
                { text: 'Accepter', onPress: () => resolve(true) },
              ],
            );
          }),
        (p) => setPercent(p.percent),
        (s, msg) => setStatus({ s, msg }),
      );
    } catch (e) {
      setStatus({ s: TransferStatus.FAILED, msg: String(e) });
    }
  };

  const startSend = async () => {
    const engine = engineRef.current;
    if (!engine || !pcIP.trim()) return;
    try {
      // TODO Phase 2 : fichiers réels depuis la sélection multi-fichiers
      const files: TransferFile[] = [];
      await engine.sendViaUsb(
        pcIP.trim(),
        files,
        (p) => setPercent(p.percent),
        (s, msg) => setStatus({ s, msg }),
      );
    } catch (e) {
      setStatus({ s: TransferStatus.FAILED, msg: String(e) });
    }
  };

  const goBack = () => {
    engineRef.current?.cancel();
    engineRef.current?.stopServer();
    router.back();
  };

  const toggleListen = () => {
    if (listening) {
      engineRef.current?.stopServer();
      setListening(false);
    } else {
      startListen();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Transfert par câble</Text>

      {/* Statut de la connexion USB — RÉEL */}
      <View style={[styles.statusCard, usbInfo?.isUsbInterface && styles.statusActive]}>
        <Text style={styles.statusIcon}>
          {usbInfo?.isUsbInterface ? '✅' : usbInfo?.localIP ? '🔌' : '❌'}
        </Text>
        <Text style={styles.statusText}>
          {usbInfo?.isUsbInterface
            ? `Câble USB actif · ${usbInfo.localIP}`
            : usbInfo?.localIP
              ? `Réseau détecté (${usbInfo.interfaceName}) — câble USB non reconnu`
              : 'Aucun câble détecté'}
        </Text>
        {usbInfo?.localIP ? <Text style={styles.ipText}>{usbInfo.interfaceName}</Text> : null}
      </View>

      {/* Barre de progression réelle */}
      {percent > 0 && percent < 100 && (
        <View style={styles.progressCard}>
          <Text style={styles.statusText}>Transfert : {Math.round(percent)}%</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.min(100, percent)}%` }]} />
          </View>
        </View>
      )}

      {status?.msg ? <Text style={styles.statusMsg}>{status.msg}</Text> : null}

      {/* Mode écoute : attendre un PC par le câble */}
      <TouchableOpacity
        style={[styles.actionButton, !usbInfo?.localIP && styles.disabled]}
        disabled={!usbInfo?.localIP}
        onPress={toggleListen}
      >
        <Text style={styles.actionText}>
          {listening ? 'Arrêter l’écoute' : 'Recevoir par le câble'}
        </Text>
      </TouchableOpacity>

      {/* Mode envoi : IP du PC + bouton */}
      <TextInput
        style={styles.input}
        placeholder="IP du PC (ex: 172.20.10.1)"
        placeholderTextColor={colors.textSecondary}
        value={pcIP}
        onChangeText={setPcIP}
        keyboardType="numbers-and-punctuation"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.actionButton, (!usbInfo?.isUsbInterface || !pcIP.trim()) && styles.disabled]}
        disabled={!usbInfo?.isUsbInterface || !pcIP.trim()}
        onPress={startSend}
      >
        <Text style={styles.actionText}>Envoyer par le câble</Text>
      </TouchableOpacity>

      {/* Instructions */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>📋 iPhone</Text>
        <Text style={styles.step}>1. Branchez le câble entre l'iPhone et le PC</Text>
        <Text style={styles.step}>2. « Faire confiance à cet ordinateur » → Confiance</Text>
        <Text style={styles.step}>3. Fylio Desktop affiche son IP — saisis-la ici</Text>
      </View>
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>📱 Android</Text>
        <Text style={styles.step}>1. Branchez le câble USB</Text>
        <Text style={styles.step}>2. Mode « Transfert de fichiers (MTP) »</Text>
        <Text style={styles.step}>3. Saisis l'IP affichée par Fylio Desktop</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  backButton: { alignSelf: 'flex-start', marginBottom: spacing.sm },
  backText: { ...typography.body, color: colors.primary, fontWeight: '600' },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.lg },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  statusActive: { borderColor: colors.success },
  statusIcon: { fontSize: 44, marginBottom: spacing.sm },
  statusText: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  ipText: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  track: { height: 10, backgroundColor: colors.skyLight, borderRadius: 5, marginTop: spacing.sm },
  fill: { height: '100%', backgroundColor: colors.primary, borderRadius: 5 },
  statusMsg: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.md },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  actionText: { ...typography.button, color: colors.textOnPrimary },
  disabled: { backgroundColor: colors.primaryDisabled },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instructionsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  instructionsTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  step: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.xs },
});
