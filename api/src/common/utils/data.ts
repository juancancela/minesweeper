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
 * @param x the x axis size of the matrix
 * @param y the y axis size of the matrix
 * @param total the total number of positions of the matrix set to true
 */
export function randomMatrix(x: number, y: number, total: number): boolean[][] {
	if (!arePositiveInt([x, y, total])) return [];
	const random = (val: number): number => Math.floor(Math.random() * val);
	let totalPlaced: number = 0;
	let map: boolean[][] = [];
	for (let i = 0; i < y; i++) {
		for (let j = 0; j < x; j++) {
			if (!map[i]) map[i] = [];
			map[i][j] = false;
		}
	}

	do {
		const rx = random(x);
		const ry = random(y);
		if (!map[rx][ry]) {
			map[rx][ry] = true;
			++totalPlaced;
		}
	} while (totalPlaced !== total);

	return map;
}
