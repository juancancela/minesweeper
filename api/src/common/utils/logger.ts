import winston from 'winston';

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { date: new Date() },
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
});

export const errorMsg = (msg: string) => {
	return {
		system: 'api',
		date: new Date().toISOString(),
		message: msg,
	};
};
