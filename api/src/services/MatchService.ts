import { Match } from '../models/Match';
import { create, read, update, remove } from '../common/utils/db';
import { Command } from '../common/Command';
import { Board } from '../models/Board';
import { LruCache } from '../common/Cache';

export class MatchService {
	public static Cache = new LruCache<Match>();

	/**
	 * @param playerId id of the player that owns the match
	 * @param rows the number of rows of the board
	 * @param cols the number of columns of the board
	 * @param bombs the amount of bombs placed on the board
	 */
	async createMath(playerId: string, rows?: number, cols?: number, bombs?: number): Promise<Match> {
		const board = new Board(rows, cols, bombs);
		const match = new Match(playerId, board);
		const id = `${playerId}-${new Date().getTime().toString()}`;
		match.setId(id);
		await create('matches', match);
		MatchService.Cache.put(id, match);
		return match;
	}

	/**
	 * @param matchId id of the match to be deleted
	 */
	async deleteMatch(matchId: string): Promise<void> {
		return await remove('matches', matchId);
	}

	/**
	 * Gets the list of all matches
	 */
	async getMatches(): Promise<Match[]> {
		return await read('matches', {}, true);
	}

	/**
	 * @param id id of the match to be retrieved
	 */
	async getMatchById(id: string): Promise<Match | any> {
		let cachedMatch = MatchService.Cache.get(id);
		if (cachedMatch) return cachedMatch;
		return await read('matches', { id });
	}

	/**
	 * Returns list of all matches of the given player identified by id
	 * @param playerId id of the player
	 */
	async getMatchesByPlayerId(playerId: string): Promise<Match[] | any[]> {
		const matches = await read('matches', { playerId }, true);
		return matches;
	}

	/**
	 * @param matchId id of the match to be saved
	 */
	async saveMatch(matchId: string): Promise<void> {
		await update('matches', MatchService.Cache.get(matchId), matchId);
	}

	/**
	 * Executes a given command
	 * @param command instance of a @Command
	 */
	async executeCommand<Match>(command: Command<Match>): Promise<Match> {
		const updatedMatch = await command.execute();
		return updatedMatch;
	}
}
