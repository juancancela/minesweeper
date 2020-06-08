require('dotenv').config();

export const port: number = parseInt(process.env.PORT || '3000');
export const connectionString: string = process.env.MONGODB_CONNECTION_STRING || '';
export const databaseName: string = process.env.MONGODB_DB_NAME || '';
export const testUserEmail: string = process.env.TEST_USER || 'juan@dev.com';
export const testUserPassword: string = process.env.TEST_PASSWORD || '123';
export const testPlayerId: string = process.env.TEST_PLAYER_ID || 'player1';
export const testUserEmail1: string = process.env.TEST_USER1 || 'juanz1@dev.zcom';
export const testUserPassword1: string = process.env.TEST_PASSWORD1 || '123';
export const testPlayerId1: string = process.env.TEST_PLAYER_ID1 || 'player1';
export const testUserToken: string = process.env.TEST_USER_TOKEN || '123ewqSDSADWW212123hgfhyu67GDGFd';
