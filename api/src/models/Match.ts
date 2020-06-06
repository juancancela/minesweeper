import { Entity } from '../common/Entity';
import { Board } from './Board';
import { MatchStateType } from './MatchStateType';

export class Match extends Entity {
	private state: MatchStateType = MatchStateType.INITIAL;
	private board: Board;
	private playerId: string;

	constructor(playerId: string, board: Board) {
		super();
		this.board = board;
		this.playerId = playerId;
	}

	getState(): MatchStateType {
		return this.state;
	}

	getBoard(): Board {
		return this.board;
	}

	getPlayerId(): string {
		return this.playerId;
	}
}
