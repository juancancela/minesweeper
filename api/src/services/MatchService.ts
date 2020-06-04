import { Match } from '../models/Match';
import { run } from '../common/utils/db';

export class MatchService {
	createMath(): Match {
		return new Match('1', '3');
	}

	async getMatch(id: string): Promise<Match> {
		const result = await run('matches');
		return result as Match;
	}
}
