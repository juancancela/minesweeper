import express from 'express';
import { Request, Response } from 'express';
import services from '../services';

const router = express.Router();
const service = services.matchService;

router.get('/', async (req: Request, res: Response) => {
	const match = await service.getMatch('1');
	return res.send(match);
});

export default router;
