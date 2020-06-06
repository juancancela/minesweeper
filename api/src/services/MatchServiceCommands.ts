import { Command } from '../common/Command';
import { Match } from '../models/Match';
import services from './index';
import { MatchService } from './MatchService';
import { CellStateType } from '../models/CellStateType';

export class UpdateCellCommand implements Command<Promise<Match>> {
	private matchId: string;
	private type: CellStateType;
	private x: number;
	private y: number;
	private service: MatchService;

	constructor(matchId: string, type: CellStateType, x: number, y: number) {
		this.matchId = matchId;
		this.service = services.matchService;
		this.x = x;
		this.y = y;
		this.type = type;
	}

	async execute(): Promise<Match> {
		try {
			const match = await this.service.getMatchById(this.matchId);
			const board = match.getBoard();
			const cells = board.getCells();
			cells[this.x][this.y].setState(this.type);
			return match;
		} catch (err) {
			throw new Error(`Execution of UncoverCellComand failed. Details: ${err}`);
		}
	}
}
