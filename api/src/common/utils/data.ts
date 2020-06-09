import _ from 'lodash';
import { CellStateType } from '../../models/CellStateType';

/**
 * Checks whether or not the given value is a positive integer or not
 * @param val value to be evaluated
 */
export function isPositiveInt(val: number): boolean {
	if (_.isNumber(val) && val > 0) return true;
	return false;
}

/**
 * Checks if all the values of the given vals array are positive integers
 * @param vals values to be evaluated
 */
export function arePositiveInt(vals: number[]): boolean {
	let res = true;
	for (let i = 0; i < vals.length; i++) {
		if (!isPositiveInt(vals[i])) {
			res = false;
			break;
		}
	}
	return res;
}

/**
 * Creates a matrix of size x*y with total number of randon positions set to true
 * @param cols the number of columns of the matrix
 * @param rows the number of rows of the matrix
 * @param total the total number of positions of the matrix set to true
 */
export function randomMatrix(cols: number, rows: number, total: number): boolean[][] {
	if (!arePositiveInt([cols, rows, total])) return [];
	const random = (val: number): number => Math.floor(Math.random() * val);
	let totalPlaced: number = 0;
	let map: boolean[][] = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (!map[i]) map[i] = [];
			map[i][j] = false;
		}
	}

	do {
		const rRow = random(rows);
		const rCol = random(cols);
		if (!map[rRow][rCol]) {
			map[rRow][rCol] = true;
			++totalPlaced;
		}
	} while (totalPlaced !== total);

	return map;
}

/**
 * Calculates the sum of the adjacent elements maked in the given map, for the given [x,y] position.
 * @param x the pivot row index
 * @param y the pivot column index
 * @param map the map with the marked positions
 * @param maxX the maximum number of x
 * @param maxY the maximum number of y
 */
export function calculateAdjCoeficient(x: number, y: number, map: boolean[][], maxX: number, maxY: number): number {
	let total = 0;
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			const isInBounds = x + dx < maxX && x + dx >= 0 && y + dy < maxY && y + dy >= 0;
			const isPivot = dx === 0 && dy === 0;
			if (!isPivot && isInBounds) {
				const isMarked = map[x + dx][y + dy];
				total += isMarked ? 1 : 0;
			}
		}
	}
	return total;
}

/**
 * Implementation of the flood fill algorithm
 * @param x the first index of the initial positions from where the flood fill process starts
 * @param y  the second index of the initial positions from where the flood fill process starts
 * @param matrix the boolean matrix containing the positions that are marked
 * @param cells the array where the flood fill footprint will get saved
 *
 * @TODO Not ideal, those Anys should be removable, params are not correct :/
 */
export function floodFill(x: number, y: number, map: any, start: boolean = false): void {
	const isInBounds = x >= 0 && x < map.length && y >= 0 && y < map[x].length;
	if (!isInBounds) return;
	const isUncovered = map[x][y].state === CellStateType.UNCOVERED;
	if (!start && isUncovered) return;
	const noAdjs = map[x][y].adjacentBombs === 0;
	if (!noAdjs) {
		map[x][y].state = CellStateType.UNCOVERED;
		return;
	}
	map[x][y].state = CellStateType.UNCOVERED;

	floodFill(x + 1, y, map);
	floodFill(x - 1, y, map);
	floodFill(x, y + 1, map);
	floodFill(x, y - 1, map);
}
