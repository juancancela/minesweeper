import { run, setClient } from '../../../src/common/utils/db';
import { expect } from 'chai';

const mockedFindCreator = (mockedResult: any = []) => {
	return (params: any) => {
		return {
			toArray: () => {
				return mockedResult;
			},
		};
	};
};

const mockedMongoDBClient = (find: Function = mockedFindCreator) => {
	return {
		connect: () => {
			return {
				db: () => {
					return {
						collection: () => {
							return {
								find,
							};
						},
					};
				},
				close: () => {},
			};
		},
	};
};

describe('commons::utils::db', async () => {
	describe('run()', async () => {
		const find = mockedFindCreator([
			{
				testKey: 'testValue',
			},
		]);
		it('should return the result of a query as a list if isList is true', async () => {
			setClient(mockedMongoDBClient(find));
			const res = await run('testCollectionName', {}, true);
			expect(res.length).to.equal(1);
			expect(res[0].testKey).to.equal('testValue');
		});
		it('should return the result of a query as an object if isList is false', async () => {
			setClient(mockedMongoDBClient(find));
			const res = await run('testCollectionName', {}, false);
			expect(res.length).to.be.undefined;
			expect(res.testKey).to.equal('testValue');
		});
		it('should throw an explicit error if the client is not correctly set', async () => {
			setClient(null);
			try {
				await run('testCollectionName', {}, false);
			} catch (e) {
				expect(e.toString()).to.contains('Error: Connection to MongoDB failed.');
			}
		});
	});
});
