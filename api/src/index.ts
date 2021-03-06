import express, { Application } from 'express';
import cors from 'cors';
import { logger, props } from './common/utils';
import use from './routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/auth', use.authRoutes);
app.use('/match', use.matchRoutes);
app.use('/player', use.playerRoutes);

app.listen(props.port, () => logger.info(`minesweeper-api::running at http://localhost:${props.port}`));
