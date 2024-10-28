import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { registerPlayer, createRoom, players } from '../game/gameActions';
import { Command } from '../types/enums';
import updateRooms from '../utils/updateRoom';
import { rooms } from '../game/gameActions';

export const server = createServer();
export const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message: string) => {
    const { type, data } = JSON.parse(message);
    console.log(`Received command: ${type}`);

    switch (type) {
      case Command.REG:
        const { name, password } = data;
        const regResponse = registerPlayer(wss, name, password);

        ws.send(
          JSON.stringify({
            type: Command.REG,
            data: JSON.stringify(regResponse),
          }),
        );
        console.log(`Sent command: ${Command.REG}`);
        break;

      case Command.CREATE_ROOM:
      //   const player = players[0];

      //   if (player) {
      //     createRoom(wss, player);
      //   }
      //   break;

      // case Command.ADD_USER_TO_ROOM:
      // const joiningPlayer = players[1];

      // if (joiningPlayer) {
      //   const joinResponse = joinRoom(joiningPlayer, data.roomId);

      //   wss.clients.forEach((client) => {
      //     if (client.readyState === WebSocket.OPEN) {
      //       client.send(
      //         JSON.stringify({
      //           type: Command.CREATE_GAME,
      //           data: JSON.stringify(joinResponse),
      //         }),
      //       );
      //     }
      //   });
      //   console.log(`Sent command: ${Command.CREATE_GAME}`);
      // }

      // break;

      default:
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown command' }));
        break;
    }
  });

  ws.on('close', () => console.log('Connection closed'));
});
