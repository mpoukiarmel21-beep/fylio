/**
 * Déclarations de types pour les modules natifs React Native
 * sans déclarations TypeScript officielles
 */

declare module 'react-native-zeroconf' {
  export interface ZeroconfService {
    name: string;
    host: string;
    addresses: string[];
    port: number;
    fullName: string;
  }

  export default class Zeroconf {
    on(event: string, callback: (data: any) => void): void;
    publishService(
      type: string,
      protocol: string,
      domain: string,
      name: string,
      port: number,
      txt?: Record<string, unknown>,
    ): void;
    scan(type?: string, protocol?: string, domain?: string): void;
    stop(): void;
  }
}

declare module 'react-native-tcp-socket' {
  interface TcpSocketOptions {
    host: string;
    port: number;
    localAddress?: string;
    interface?: string;
  }

  interface TcpServerOptions {
    port: number;
    host: string;
  }

  export interface Socket {
    write(data: string | Uint8Array, encoding?: string, callback?: () => void): boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event: 'data', callback: (data: any) => void): void;
    on(event: 'close', callback: () => void): void;
    on(event: 'error', callback: (err: Error) => void): void;
    destroy(): void;
    end(): void;
  }

  export interface Server {
    listen(options: TcpServerOptions, callback?: () => void): void;
    on(event: 'connection', callback: (socket: Socket) => void): void;
    on(event: 'error', callback: (err: Error) => void): void;
    close(callback?: () => void): void;
  }

  const TcpSocket: {
    createConnection(options: TcpSocketOptions, callback: () => void): Socket;
    createServer(callback: (socket: Socket) => void): Server;
  };

  export default TcpSocket;
}
