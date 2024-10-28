export interface Player {
  name: string;
  password: string;
  id: number;
}

export interface Room {
  roomId: string;
  roomUsers: Player[];
}

export interface Game {
  gameId: string;
  roomUsers: Player[];
  turnIndex: number;
}
