import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import { errorMsg } from '../common/utils/logger';

const router = express.Router();
const svc = services.matchService;

router.get('/', async (req: Request, res: Response) => {
	try {
		return res.send(await svc.getMatches());
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const id = String(req.query.id);
		return res.send(await svc.getMatchById(id));
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

export default router;
