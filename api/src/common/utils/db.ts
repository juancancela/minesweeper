import BluebirdPromise from 'bluebird';
import { connectionString, databaseName } from './props';
const mongoDb = BluebirdPromise.promisifyAll(require('mongodb'));
const client = mongoDb.MongoClient;

export const run = async (collectionName: string, params: Object = {}, isList: boolean = false) => {
	const connection = await client.connect(connectionString);
	const db = connection.db(databaseName);
	const col = db.collection(collectionName);
	try {
		const res = await col.find(params).toArray();
		if (isList) return res;
		return res[0];
	} catch (error) {
		console.log('error', error);
		//TODO Review once error handling is implemented
	} finally {
		await connection.close();
	}
};
