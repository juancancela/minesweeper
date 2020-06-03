require('dotenv').config();

export const port: number = parseInt(process.env.PORT || '3000');
export const connectionString: string = process.env.MONGODB_CONNECTION_STRING || '';
export const databaseName: string = process.env.MONGODB_DB_NAME || '';
