import { Command } from '../common/Command';
import { Match } from '../models/Match';
import services from './index';
import { MatchService } from './MatchService';
import { CellStateType } from '../models/CellStateType';
import { floodFill } from '../common/utils/data';
import { MatchStateType } from '../models/MatchStateType';

/**
 * Commands of the Match Service
 */
export class UpdateCellCommand implements Command<Promise<Match>> {
	private matchId: string;
	private type: CellStateType;
	private x: number;
	private y: number;
	private service: MatchService;

	constructor(matchId: string, type: CellStateType, x: number, y: number) {
		this.matchId = matchId;
		this.service = services.matchService;
		this.x = Number(x);
		this.y = Number(y);
		this.type = type;
	}

	private isBoardUncovered(board: any): boolean {
		let result = 0;
		for (let row = 0; row < board.rows; row++) {
			for (let col = 0; col < board.cols; col++) {
				if (board.cells[row][col].state === CellStateType.COVERED) {
					result++;
				}
			}
		}
		return result - board.bombs === 1;
	}

	async execute(): Promise<Match> {
		try {
			let match = await this.service.getMatchById(this.matchId);
			const board = match.board;
			const cells = board.cells;
			const cell = cells[this.x][this.y];
			if (match.state !== MatchStateType.LOST && match.state !== MatchStateType.WON) {
				if (cell.hasBomb) {
					match.state = MatchStateType.LOST;
				} else {
					if (this.isBoardUncovered(board)) match.state = MatchStateType.WON;
				}
			}
			cell.state = this.type;
			floodFill(this.x, this.y, cells, true);
			MatchService.Cache.put(this.matchId, match);
			return match;
		} catch (err) {
			throw new Error(`Execution of UncoverCellComand failed. Details: ${err}`);
		}
	}
}
