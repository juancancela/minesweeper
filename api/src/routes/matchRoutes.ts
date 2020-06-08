import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import { responseError, responseOk } from '../common/utils/service';

const router = express.Router();
const { matchService } = services;

router.get('/', async (req: Request, res: Response) => {
	try {
		const result = await matchService.getMatches();
		return res.send(responseOk(result));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const id = String(req.params?.id);
		const result = await matchService.getMatchById(id);
		return res.send(responseOk(result));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

export default router;
