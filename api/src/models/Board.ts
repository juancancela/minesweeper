import { Cell } from './Cell';
import { randomMatrix, calculateAdjCoeficient } from '../common/utils/data';
import { CellStateType } from './CellStateType';

const DEFAULT_NUMBER_OF_ROWS = 10;
const DEFAULT_NUMBER_OF_COLS = 10;
const DEFAULT_NUMBER_OF_BOMBS = 10;

const MAX_NUMBER_OF_ROWS = 15;
const MAX_NUMBER_OF_COLS = 15;

export class Board {
	private cells: Cell[][] = [];
	private rows: number;
	private cols: number;
	private bombs: number;

	constructor(
		rows: number = DEFAULT_NUMBER_OF_ROWS,
		cols: number = DEFAULT_NUMBER_OF_COLS,
		bombs: number = DEFAULT_NUMBER_OF_BOMBS
	) {
		if (rows > MAX_NUMBER_OF_ROWS || cols > MAX_NUMBER_OF_COLS || rows <= 0 || cols <= 0 || bombs >= rows * cols)
			throw new Error(
				`Provided rows(${rows}), cols(${cols}) and bombs(${bombs}) parameters are not valid. All of them should be positive, below 15 and there should be less bombs that available cells.`
			);
		this.rows = rows;
		this.cols = cols;
		this.bombs = bombs;
		this.cells = this.initCells(Number(cols), Number(rows), Number(bombs));
	}

	private initCells(cols: number, rows: number, bombs: number): Cell[][] {
		let cells: Cell[][] = [];
		let bombsMatrix = randomMatrix(cols, rows, bombs);
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				if (!cells[x]) cells[x] = [];
				const hasBomb = bombsMatrix[x][y];
				const adj = calculateAdjCoeficient(x, y, bombsMatrix, cols, rows);
				cells[x][y] = new Cell(CellStateType.COVERED, hasBomb);
				cells[x][y].setAdjacentBombs(adj);
			}
		}
		return cells;
	}

	getRows(): number {
		return this.rows;
	}

	getCols(): number {
		return this.cols;
	}

	getBombs(): number {
		return this.bombs;
	}

	getCells(): Cell[][] {
		return this.cells;
	}

	getCell(x: number, y: number): Cell {
		return this.cells[x][y];
	}

	getCellAdjacentBombs(x: number, y: number): number {
		return this.cells[x][y].getAdjacentBombs();
	}

	uncover(x: number, y: number): void {
		this.getCell(x, y).setState(CellStateType.UNCOVERED);
	}

	flagReg(x: number, y: number): void {
		this.getCell(x, y).setState(CellStateType.FLAGGED_RED);
	}

	flagQuestion(x: number, y: number): void {
		this.getCell(x, y).setState(CellStateType.FLAGGED_QUESTION);
	}
}
