import express from 'express';
import { Application, Request, Response } from 'express';
import { logger, props } from './utils';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World!');
});

app.listen(props.port, () => logger.info(`minesweeper-api::running at http://localhost:${props.port}`));
