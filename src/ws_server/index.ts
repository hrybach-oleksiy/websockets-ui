import { WebSocketServer } from 'ws';
import { createServer } from 'http';

export const server = createServer();
export const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const parsedData = JSON.parse(data.toString());
    console.log(parsedData);
  });

  ws.on('close', () => console.log('Connection closed'));
});
