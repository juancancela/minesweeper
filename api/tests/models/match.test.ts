import { Match } from '../../src/models/Match';
import { expect } from 'chai';
import { Board } from '../../src/models/Board';

describe('models::Match', async () => {
	const defaultMatch = new Match('2', new Board());
	it('should successfully create a match with default board settings', async () => {
		const board = defaultMatch.getBoard();
		expect(defaultMatch.getPlayerId()).to.equal('2');
		expect(board.getBombs()).to.equal(10);
		expect(board.getCells()[0].length).to.equal(10);
	});
});
