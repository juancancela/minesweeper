import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './docs/swagger';
import { logger, props } from './common/utils';
import use from './routes';

const app: Application = express();

app.use(express.json());
app.use('/auth', use.authRoutes);
app.use('/match', use.matchRoutes);
app.use('/player', use.playerRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc()));

app.listen(props.port, () => logger.info(`minesweeper-api::running at http://localhost:${props.port}`));
