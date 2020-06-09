import { CellStateType } from './CellStateType';

export class Cell {
	private adjacentBombs: number = 0;
	private state: CellStateType;
	private hasBomb: boolean;

	constructor(state: CellStateType = CellStateType.COVERED, hasBomb: boolean = false) {
		this.state = state;
		this.hasBomb = hasBomb;
	}

	getAdjacentBombs(): number {
		return this.adjacentBombs;
	}

	setAdjacentBombs(updatedAdjacentBombs: number): void {
		this.adjacentBombs = updatedAdjacentBombs;
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
