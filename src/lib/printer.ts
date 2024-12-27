import net from 'node:net';
import EscPosEncoder from 'esc-pos-encoder';

let client: net.Socket | null = null;

export const connectPrinter = (ip: string) => {
  if (client) {
    client.destroy();
  }
  client = new net.Socket();
  client.connect(9100, ip, () => {
    console.log('Conectado a la impresora en IP:', ip);
  });

  client.on('error', (err) => {
    console.error('Error al conectar con la impresora:', err);
  });

  client.on('close', () => {
    console.log('Desconectado de la impresora');
  });
};

export const printMessage = (message: string) => {
  if (!client) {
    console.error('No hay conexión con la impresora');
    return;
  }
  const encoder = new EscPosEncoder();
  const result = encoder.initialize().text(message).newline().encode();
  client.write(result);
};
