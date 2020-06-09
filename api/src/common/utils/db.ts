import BluebirdPromise from 'bluebird';
import { connectionString, databaseName } from './props';
const mongoDb = BluebirdPromise.promisifyAll(require('mongodb'));
let client = mongoDb.MongoClient;

/**
 * Executes a read query to the database
 * @param collectionName the name of the collection ot be queries
 * @param query the query to be executed on the collection
 * @param isList whether or not the result should be treated as a list of not
 */
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

/**
 * Executes a create query on the database
 * @param collectionName the name of the collection to where the new document will be inserted
 * @param obj the new document to be inserted
 */
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

/**
 * Updates -or upserts, given the case- a given document of the database.
 * @param collectionName the name of the collection
 * @param obj the new document that will updated the existing one
 * @param id the id of the document to be updated on the giving collection
 */
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

export const remove = async (collectionName: string, id: string) => {
	let connection;
	try {
		connection = await client.connect(connectionString);
		const db = connection.db(databaseName);
		const col = db.collection(collectionName);
		const res = await col.deleteOne({ id });
		return res;
	} catch (err) {
		throw new Error(`Connection to MongoDB failed. Error: ${err}`);
	} finally {
		if (connection) await connection.close();
	}
};

/**
 * Sets the driver of the databse
 * @param cli databse driver client
 */
export const setClient = (cli: any) => {
	client = cli;
};
