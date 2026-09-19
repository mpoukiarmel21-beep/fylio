/**
 * Découverte d'appareils Fylio — Zeroconf/Bonjour
 *
 * - Publie le service "_fylio._tcp" sur le réseau local
 * - Scanne les appareils Fylio sur le même Wi-Fi
 * - Fournit IP + port + nom d'appareil pour connexion directe
 */

import Zeroconf from 'react-native-zeroconf';

export interface DiscoveredDevice {
  name: string;
  host: string;
  port: number;
  fylioNumber: string;
}

export class DeviceDiscovery {
  private zeroconf: Zeroconf;
  private devices: Map<string, DiscoveredDevice> = new Map();
  private listeners: ((devices: DiscoveredDevice[]) => void)[] = [];

  constructor() {
    this.zeroconf = new Zeroconf();
    this.setupHandlers();
  }

  private setupHandlers() {
    this.zeroconf.on('resolved', (service) => {
      if (service.name?.startsWith('Fylio-')) {
        const device: DiscoveredDevice = {
          name: service.name,
          host: service.addresses?.[0] || service.host || '',
          port: service.port || 48123,
          fylioNumber: service.name,
        };
        this.devices.set(device.name, device);
        this.notifyListeners();
      }
    });

    this.zeroconf.on('remove', (name) => {
      if (name?.startsWith('Fylio-')) {
        this.devices.delete(name);
        this.notifyListeners();
      }
    });

    this.zeroconf.on('error', () => {
      // erreur réseau silencieuse — le scan continue
    });
  }

  /**
   * Publie ce device sur le réseau local
   */
  publish(deviceName: string, fylioNumber: string): void {
    this.zeroconf.publishService('fylio', 'tcp', 'local.', deviceName, 48123, {
      fylioNumber,
    });
  }

  /**
   * Arrête la publication
   */
  unpublish(): void {
    this.zeroconf.stop();
  }

  /**
   * Démarre le scan des appareils Fylio sur le réseau
   */
  scan(): void {
    this.devices.clear();
    this.zeroconf.scan('fylio', 'tcp', 'local.');
  }

  /**
   * Arrête le scan
   */
  stopScan(): void {
    this.zeroconf.stop();
  }

  /**
   * Retourne la liste actuelle des appareils découverts
   */
  getDevices(): DiscoveredDevice[] {
    return Array.from(this.devices.values());
  }

  /**
   * S'abonne aux changements de liste d'appareils
   */
  onDevicesChanged(listener: (devices: DiscoveredDevice[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    const list = this.getDevices();
    for (const listener of this.listeners) {
      listener(list);
    }
  }
}

// Instance singleton partagée
export const discovery = new DeviceDiscovery();
