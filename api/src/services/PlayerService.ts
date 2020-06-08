import { Player } from '../models/Player';

/**
 * Player Service. Due to not surpass time restrictions, and that is not important for the
 * objectives of the game, will be just a mock.
 */
export class PlayerService {
	async getPlayer(id: string): Promise<Player> {
		return new Player('Juan Carlos Cancela', 'juan@dev.com');
	}
}
