import WebSocket from 'ws';
import { Player } from '../types/interfaces';
import { Command } from '../types/enums';

const updateWinners = (wss: WebSocket.Server, players: Player[]) => {
  const winners = players.map((player) => ({
    name: player.name,
    wins: Math.floor(Math.random() * 10),
  }));

  const message = JSON.stringify({
    type: Command.UPDATE_WINNERS,
    data: JSON.stringify(winners),
    id: 0,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export default updateWinners;
