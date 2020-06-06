import { CellStateType } from './CellStateType';

export class Cell {
	private state: CellStateType;
	private hasBomb: boolean;

	constructor(state: CellStateType = CellStateType.COVERED, hasBomb: boolean = false) {
		this.state = state;
		this.hasBomb = hasBomb;
	}

	getState(): CellStateType {
		return this.state;
	}

	setState(updatedState: CellStateType) {
		this.state = updatedState;
	}

	getHasBomb(): boolean {
		return this.hasBomb;
	}
}
