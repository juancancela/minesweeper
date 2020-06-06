import { Player } from '../models/Player';

export class PlayerService {
	async createPlayer(name: string, email: string, password: string): Promise<Player> {
		return new Player('Juan Carlos Cancela', 's', 's');
	}

	async getPlayers(): Promise<Player[]> {
		return [new Player('Juan Carlos Cancela', 's', 's')];
	}
	async getPlayer(id: string): Promise<Player> {
		return new Player('Juan Carlos Cancela', 's', 's');
	}
}
