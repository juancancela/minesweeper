import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import { errorMsg } from '../common/utils/logger';
import { ServiceResponse } from '../common/ServiceResponse';

const router = express.Router();
const { authService } = services;

router.post('/login', async (req: Request, res: Response) => {
	try {
		const email = String(req.body.email);
		const password = String(req.body.password);
		const authResp = await authService.login(email, password);
		const response = new ServiceResponse(authResp, authResp.success);
		return res.send(response);
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

export default router;
