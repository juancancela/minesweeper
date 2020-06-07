import _ from 'lodash';

/**
 * Checks whether or not the given value is a positive integer or not
 * @param val value to be evaluated
 */
export function isPositiveInt(val: number) {
	if (_.isNumber(val) && val > 0) return true;
	return false;
}

/**
 * Checks if all the values of the given vals array are positive integers
 * @param vals values to be evaluated
 */
export function arePositiveInt(vals: number[]) {
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
