import { Match } from '../models/Match';
import { create, read, update } from '../common/utils/db';
import { Command } from '../common/Command';
import { Board } from '../models/Board';
import { LruCache } from '../common/Cache';

export class MatchService {
	public static Cache = new LruCache<Match>();

	async createMath(playerId: string, rows?: number, cols?: number, bombs?: number): Promise<Match> {
		const board = new Board(rows, cols, bombs);
		const match = new Match(playerId, board);
		const id = `${playerId}-${new Date().getTime().toString()}`;
		match.setId(id);
		await create('matches', match);
		MatchService.Cache.put(id, match);
		return match;
	}

	async deleteMatch(matchId: string): Promise<void> {
		return;
	}

	async getMatches(): Promise<Match[]> {
		const board = new Board();
		return [new Match('2', board)];
	}

	async getMatchById(id: string): Promise<Match | any> {
		let cachedMatch = MatchService.Cache.get(id);
		if (cachedMatch) return cachedMatch;
		return await read('matches', { id });
	}

	async getMatchesByPlayerId(playerId: string): Promise<Match[] | any[]> {
		const matches = await read('matches', { playerId }, true);
		return matches;
	}

	async saveMatch(matchId: string): Promise<void> {
		await update('matches', MatchService.Cache.get(matchId), matchId);
	}

	async executeCommand<Match>(command: Command<Match>): Promise<Match> {
		const updatedMatch = await command.execute();
		return updatedMatch;
	}
}
