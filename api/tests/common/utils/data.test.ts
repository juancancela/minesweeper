import { randomMatrix, isPositiveInt, arePositiveInt } from '../../../src/common/utils/data';
import { expect } from 'chai';

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
});
