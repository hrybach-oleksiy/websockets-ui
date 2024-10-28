export class Player {
  static id = 0;
  name: string;
  password: string;
  id: number;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
    this.id = Player.id;
    Player.id++;
  }
}
