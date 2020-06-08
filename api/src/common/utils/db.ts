import BluebirdPromise from 'bluebird';
import { connectionString, databaseName } from './props';
const mongoDb = BluebirdPromise.promisifyAll(require('mongodb'));
let client = mongoDb.MongoClient;

export const read = async (collectionName: string, query: Object = {}, isList: boolean = false) => {
	let connection;
	try {
		connection = await client.connect(connectionString);
		const db = connection.db(databaseName);
		const col = db.collection(collectionName);
		const res = await col.find(query).toArray();
		if (isList) return res;
		return res[0];
	} catch (err) {
		throw new Error(`Connection to MongoDB failed. Error: ${err}`);
	} finally {
		if (connection) await connection.close();
	}
};

export const create = async (collectionName: string, obj: Object = {}) => {
	let connection;
	try {
		connection = await client.connect(connectionString);
		const db = connection.db(databaseName);
		const col = db.collection(collectionName);
		const res = await col.insertOne(obj);
		return res;
	} catch (err) {
		throw new Error(`Connection to MongoDB failed. Error: ${err}`);
	} finally {
		if (connection) await connection.close();
	}
};

export const update = async (collectionName: string, obj: Object = {}, id: string) => {
	let connection;
	try {
		connection = await client.connect(connectionString);
		const db = connection.db(databaseName);
		const col = db.collection(collectionName);
		const res = await col.replaceOne({ id }, obj, { upsert: true });
		return res;
	} catch (err) {
		throw new Error(`Connection to MongoDB failed. Error: ${err}`);
	} finally {
		if (connection) await connection.close();
	}
};

export const setClient = (cli: any) => {
	client = cli;
};
