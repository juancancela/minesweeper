import {
	randomMatrix,
	isPositiveInt,
	arePositiveInt,
	calculateAdjCoeficient,
	floodFill,
} from '../../../src/common/utils/data';
import { expect } from 'chai';
import { Cell } from '../../../src/models/Cell';
import { CellStateType } from '../../../src/models/CellStateType';

describe('commons::utils::data', () => {
	describe('randomMatrix(x: number, y: number, total: number)', () => {
		it('should return a valid map with randon positions if x, y, and random are valid positive integers', () => {
			const map = randomMatrix(10, 10, 10);
			expect(map.length).to.equal(10);
			expect(map[0].length).to.equal(10);
			let total = 0;
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					if (map[i][j] === true) ++total;
				}
			}
			expect(total).to.equal(10);
		});
		it('should contain the number of positions marked as true equal to the provided total', () => {
			const map = randomMatrix(10, 10, 10);
			let total = 0;
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					if (map[i][j] === true) ++total;
				}
			}
			expect(total).to.equal(10);
		});
		it('should return an empty array if parameters are not positive integers', () => {
			const mapWithNegIntegers = randomMatrix(-10, -10, -10);
			expect(mapWithNegIntegers.length).to.equal(0);
		});
	});
	describe('arePositiveInt(vals: number[])', () => {
		it('should return false if any of the given numbers is not a positive integer', () => {
			expect(arePositiveInt([1, 1, -3, 2])).to.equal(false);
		});
		it('should return true if all the given numbers are positive integers', () => {
			expect(arePositiveInt([1, 1, 3, 2])).to.equal(true);
		});
	});
	describe('isPositiveInt(val: number)', () => {
		it('should return false if the given number is not a positive integer', () => {
			expect(isPositiveInt(-1)).to.equal(false);
		});
		it('should return true if the given number is a positive integer', () => {
			expect(isPositiveInt(1)).to.equal(true);
		});
	});
	describe('calculateAdjCoeficient(x: number, y: number, map: boolean[][], maxX: number, maxY: number)', () => {
		it('should return false if the given number is not a positive integer', () => {
			const matrix = [
				[true, false, true, false, true, false],
				[true, false, true, false, true, false],
				[true, true, true, true, true, false],
				[true, false, true, false, true, false],
				[true, false, true, false, true, false],
				[true, false, true, false, true, false],
			];
			const adj1 = calculateAdjCoeficient(2, 2, matrix, 6, 6);
			const adj2 = calculateAdjCoeficient(0, 0, matrix, 6, 6);
			const adj3 = calculateAdjCoeficient(5, 5, matrix, 6, 6);
			const adj4 = calculateAdjCoeficient(4, 4, matrix, 6, 6);

			expect(adj1).to.equal(4);
			expect(adj2).to.equal(1);
			expect(adj3).to.equal(2);
			expect(adj4).to.equal(2);
		});
	});
	describe('floodFill(x: number, y: number, matrix: boolean[][])', () => {
		it('should uncover all contiguous positions to the started point (flood fill pattern)', () => {
			let cells: Cell[][] = new Array(6)
				.fill(new Cell(CellStateType.COVERED))
				.map(() => new Array(6).fill(new Cell(CellStateType.COVERED)));

			floodFill(2, 2, cells);

			expect(cells[2][0].getState()).to.equal(CellStateType.UNCOVERED);
			expect(cells[2][1].getState()).to.equal(CellStateType.UNCOVERED);
			expect(cells[2][2].getState()).to.equal(CellStateType.UNCOVERED);
			expect(cells[2][3].getState()).to.equal(CellStateType.UNCOVERED);
			expect(cells[2][4].getState()).to.equal(CellStateType.UNCOVERED);
			expect(cells[2][5].getState()).to.equal(CellStateType.UNCOVERED);
		});
	});
});
