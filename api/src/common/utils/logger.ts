import winston from 'winston';

/**
 * Creates a logger object
 */
export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { date: new Date() },
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
});

/**
 * Wrapper to be used when creating error messages to have a standard format.
 * @param msg error message
 */
export const errorMsg = (msg: string) => {
	return {
		system: 'api',
		date: new Date().toISOString(),
		message: msg,
	};
};
