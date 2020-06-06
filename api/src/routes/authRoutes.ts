import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import { errorMsg } from '../common/utils/logger';

const router = express.Router();
const { authService } = services;

router.post('/login', async (req: Request, res: Response) => {
	try {
		const user = String(req.body.user);
		const password = String(req.body.password);
		return res.send(authService.login(user, password));
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.get('/logout', async (req: Request, res: Response) => {
	return res.send('/auth/logout');
});

export default router;
