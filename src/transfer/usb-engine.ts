/**
 * Moteur de transfert par câble USB — réutilise le protocole Fylio existant
 *
 * Principe technique :
 * - Le câble USB crée une interface réseau virtuelle :
 *   • iPhone → PC  : « Apple Mobile Device Ethernet » (pilotes AMDS/iTunes)
 *   • Android → PC : RNDIS (Android 10-) ou NCM (Android 11+)
 * - Les deux extrémités reçoivent des IP privées (ex: 172.20.10.x)
 * - On détecte ces IP via NetInfo et on établit une connexion TCP
 *   directe PAR-DESSUS LE CÂBLE (pas de Wi-Fi nécessaire)
 * - Le protocole HANDSHAKE → MANIFEST → CHUNKS → COMPLETE
 *   du fichier protocol.ts est réutilisé tel quel
 */

import NetInfo from '@react-native-community/netinfo';
import { TransferEngine, TransferStatus } from './engine';
import { TransferFile, TransferProgress, PORT } from './protocol';

// Plages IP typiques des interfaces USB virtuelles
const USB_IP_PREFIXES = ['172.20.10.', '192.168.42.', '192.168.43.', '10.15.19.'];

export interface UsbConnectionInfo {
  isUsbInterface: boolean;
  localIP: string;
  interfaceName: string;
}

/**
 * Détecte si l'appareil est connecté par câble USB
 * (interface réseau virtuelle active)
 */
export async function detectUsbConnection(): Promise<UsbConnectionInfo> {
  const state = await NetInfo.fetch();

  if (state.type === 'ethernet' && state.details && 'ipAddress' in state.details) {
    const ip = state.details.ipAddress as string;
    const isUsb = USB_IP_PREFIXES.some((prefix) => ip.startsWith(prefix));
    return { isUsbInterface: isUsb, localIP: ip, interfaceName: 'USB (ethernet virtuel)' };
  }

  // Wi-Fi Direct / hotspot USB : l'IP est dans les plages RNDIS
  if (state.type === 'wifi' && state.details && 'ipAddress' in state.details) {
    const ip = state.details.ipAddress as string;
    const isUsb = USB_IP_PREFIXES.some((prefix) => ip.startsWith(prefix));
    return {
      isUsbInterface: isUsb,
      localIP: ip,
      interfaceName: isUsb ? 'USB (RNDIS/NCM)' : 'Wi-Fi',
    };
  }

  return { isUsbInterface: false, localIP: '', interfaceName: 'aucune' };
}

/**
 * Moteur de transfert USB — enveloppe le moteur TCP
 * avec détection du lien câble et auto-découverte du pair
 */
export class UsbTransferEngine {
  private engine = new TransferEngine();

  /**
   * Mode PC-reçoit : écoute sur l'interface USB
   * (c'est le téléphone qui se connecte au PC via Fylio Desktop)
   */
  async startUsbServer(
    onIncoming: (device: string) => Promise<boolean>,
    onProgress: (p: TransferProgress) => void,
    onStatus: (s: TransferStatus, msg?: string) => void,
  ): Promise<UsbConnectionInfo> {
    const info = await detectUsbConnection();

    if (!info.isUsbInterface && info.localIP === '') {
      onStatus(
        TransferStatus.FAILED,
        'Aucun câble USB détecté. Branchez le câble et accordez « Faire confiance à cet ordinateur » (iPhone) ou activez le mode MTP (Android).',
      );
      return info;
    }

    onStatus(TransferStatus.DISCOVERING, `En écoute sur ${info.localIP}:${PORT} via ${info.interfaceName}`);

    // Le serveur TCP existant écoute sur 0.0.0.0:PORT — inclut l'interface USB
    await this.engine.startServer(onIncoming, onProgress, onStatus);
    return info;
  }

  /**
   * Mode téléphone-envoie : se connecte au PC par le câble
   * L'IP du PC est fournie par Fylio Desktop (ou scan de la plage USB)
   */
  async sendViaUsb(
    pcIP: string,
    files: TransferFile[],
    onProgress: (p: TransferProgress) => void,
    onStatus: (s: TransferStatus, msg?: string) => void,
  ): Promise<void> {
    const info = await detectUsbConnection();

    if (!info.isUsbInterface) {
      onStatus(
        TransferStatus.FAILED,
        'Câble USB non détecté. Vérifiez la connexion et les autorisations.',
      );
      return;
    }

    onStatus(TransferStatus.CONNECTING, `Connexion au PC ${pcIP} par le câble USB...`);
    await this.engine.sendFiles(pcIP, files, onProgress, onStatus);
  }

  /**
   * Scanne la plage IP USB pour trouver le PC (auto-découverte)
   * Si notre IP est 172.20.10.2, le PC est typiquement .1 ou .15
   */
  static getUsbPeerCandidates(localIP: string): string[] {
    const parts = localIP.split('.');
    const lastOctet = parseInt(parts[3], 10);
    const base = parts.slice(0, 3).join('.');

    // Candidats les plus probables selon la norme RNDIS/Apple
    const candidates = [1, 15, 100, 2].filter((n) => n !== lastOctet);
    return candidates.map((n) => `${base}.${n}`);
  }

  pause(): void {
    this.engine.pause();
  }

  resume(): void {
    this.engine.resume();
  }

  cancel(): void {
    this.engine.cancel();
  }

  stopServer(): void {
    this.engine.stopServer();
  }
}
