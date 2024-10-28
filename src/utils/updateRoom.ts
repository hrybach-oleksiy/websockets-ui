import WebSocket from 'ws';
import { Room } from '../types/interfaces';
import { Command } from '../types/enums';

const updateRooms = (wss: WebSocket.Server, rooms: Room[]) => {
  const data = rooms.map((room) => ({
    roomId: room.roomId,
    roomUsers: room.roomUsers.map((player) => ({
      name: player.name,
      index: player.id,
    })),
  }));

  const message = JSON.stringify({
    type: Command.UPDATE_ROOM,
    data,
    id: 0,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export default updateRooms;
