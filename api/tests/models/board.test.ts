import { Board } from '../../src/models/Board';
import { expect } from 'chai';

describe('models::Board', async () => {
	it('should successfully create a board with default settings', async () => {
		const board = new Board();
		const cells = board.getCells();
		const bombs = board.getBombs();
		expect(cells.length).to.equal(10);
		expect(cells[0].length).to.equal(10);
		expect(bombs).to.equal(10);
	});
	it('should successfully create a board with custom settings', async () => {
		const board = new Board(5, 5, 5);
		const cells = board.getCells();
		const bombs = board.getBombs();
		expect(cells.length).to.equal(5);
		expect(cells[0].length).to.equal(5);
		expect(bombs).to.equal(5);
	});
});
