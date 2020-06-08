import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import {} from '../common/utils/logger';
import { responseError, responseOk } from '../common/utils/service';

const router = express.Router();
const { authService } = services;

router.post('/login', async (req: Request, res: Response) => {
	try {
		const email = String(req.body.email);
		const password = String(req.body.password);
		const result = await authService.login(email, password);
		const response = responseOk(result, result.success);
		return res.send(response);
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

export default router;
