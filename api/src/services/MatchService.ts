import { Match } from '../models/Match';
//import { run } from '../common/utils/db';
import { Command } from '../common/Command';
import { Board } from '../models/Board';
import { LruCache } from '../common/Cache';

export class MatchService {
	private cache = new LruCache<Match>();

	async createMath(playerId: string): Promise<Match> {
		const board = new Board();
		return new Match(playerId, board);
	}

	async deleteMatch(matchId: string): Promise<void> {
		return;
	}

	async getMatches(): Promise<Match[]> {
		const board = new Board();
		return [new Match('2', board)];
	}

	async getMatchById(id: string): Promise<Match> {
		let cachedMatch = this.cache.get(id);
		if (cachedMatch) return cachedMatch;
		//const match = (await run('matches')) as Match;
		const match = new Match('1', new Board());
		return match;
	}

	async getMatchesByPlayerId(id: string): Promise<Match[]> {
		const board = new Board();
		return [new Match('2', board)];
	}

	async executeCommand<Match>(command: Command<Match>): Promise<Match> {
		const updatedMatch = await command.execute();
		return updatedMatch;
	}
}
