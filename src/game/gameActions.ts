import WebSocket from 'ws';
import updateRoom from '../utils/updateRoom';
import updateWinners from '../utils/updateWinners';
import { Player, Room, Game } from '../types/interfaces';
import { Player as User } from '../player';

// export const players: Player[] = [];
export const rooms: Room[] = [];
// const games: Game[] = [];

export const players = new Map<number, Player>();

export const registerPlayer = (
  wss: WebSocket.Server,
  name: string,
  password: string,
): {
  name: string;
  index: number | undefined;
  error: boolean;
  errorText: string;
} => {
  let userExists = false;
  let errorMessage = '';
  let currentUser;
  let isError = false;

  for (const user of players.values()) {
    if (user.name === name) {
      userExists = true;
      currentUser = user;
      errorMessage = 'User already exists';
      isError = true;

      if (user.password !== password) {
        errorMessage = 'Invalid password';
        isError = true;
      }
    }
  }

  if (!userExists) {
    currentUser = new User(name, password);
    players.set(currentUser.id, currentUser);
  }

  return {
    name,
    index: currentUser?.id,
    error: isError,
    errorText: errorMessage,
  };
};

export const createRoom = (wss: WebSocket.Server, player: Player): void => {
  const roomId = String(rooms.length + 1);
  const room: Room = { roomId, roomUsers: [player] };

  rooms.push(room);

  // updateRoom(wss, rooms);
  // updateWinners(wss, players);
};

// export const joinRoom = (
//   player: Player,
//   roomId: string,
// ): { idGame?: string; idPlayer?: string; error?: string } => {
//   const room = rooms.find((r) => r.roomId === roomId);

//   if (!room) {
//     return { error: 'Room not found' };
//   }

//   if (room.roomUsers.length >= 2) {
//     return { error: 'Room is full' };
//   }

//   room.roomUsers.push(player);

//   if (room.roomUsers.length === 2) {
//     const gameId = String(games.length + 1);

//     games.push({ gameId, roomUsers: room.roomUsers, turnIndex: 0 });
//   }

//   return {
//     idGame: room.roomId,
//     idPlayer: player.id,
//   };
// };
