import BluebirdPromise from 'bluebird';
import { connectionString, databaseName } from './props';
const mongoDb = BluebirdPromise.promisifyAll(require('mongodb'));
const client = mongoDb.MongoClient;

export const run = async (collectionName: string, query: string) => {
	const connection = await client.connect(connectionString);
	const db = connection.db(databaseName);
	const col = db.collection(collectionName);
	try {
		return await col.find(query).toArray();
	} catch (error) {
		//TODO Review once error handling is implemented
	} finally {
		await connection.close();
	}
};
