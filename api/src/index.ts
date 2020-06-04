import express from 'express';
import { Application, Request, Response } from 'express';
import { logger, props } from './common/utils';
import routes from './routes';

const app: Application = express();

app.get('/', (req: Request, res: Response) => res.send('minesweeper-api'));
app.use('/match', routes.match);

app.listen(props.port, () => logger.info(`minesweeper-api::running at http://localhost:${props.port}`));
