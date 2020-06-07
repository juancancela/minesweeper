import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import { errorMsg } from '../common/utils/logger';
import { UpdateCellCommand } from '../services/MatchServiceCommands';
import { CellStateType } from '../models/CellStateType';
import { NullCommand } from '../common/NullCommand';
import { ServiceResponse } from '../common/ServiceResponse';

const { matchService, playerService } = services;

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		return res.send(playerService.getPlayers());
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const id = String(req.query?.id);
		return res.send(playerService.getPlayer(id));
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.get('/:playerId/match', async (req: Request, res: Response) => {
	try {
		const playerId = String(req.query?.playerId);
		const response = new ServiceResponse(matchService.getMatchesByPlayerId(playerId));
		return res.send(response);
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.post('/:playerId/match', async (req: Request, res: Response) => {
	try {
		const playerId = String(req.params?.playerId);
		const { rows, cols, bombs } = req.body;
		const match = await matchService.createMath(playerId, rows, cols, bombs);
		const response = new ServiceResponse(match);
		return res.send(response);
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.post('/:playerId/match/:matchId', async (req: Request, res: Response) => {
	try {
		const matchId = String(req.params?.matchId);
		const x = Number(req.body?.params?.x);
		const y = Number(req.body?.params?.y);
		const commandName = req.body.name?.toUpperCase();
		const { FLAGGED_QUESTION, FLAGGED_RED, UNCOVERED } = CellStateType;
		let command = new NullCommand();

		switch (commandName) {
			case 'UNCOVERED':
				command = new UpdateCellCommand(matchId, UNCOVERED, x, y);
				break;
			case 'FLAGGED_RED':
				command = new UpdateCellCommand(matchId, FLAGGED_RED, x, y);
				break;
			case 'FLAGGED_QUESTION':
				command = new UpdateCellCommand(matchId, FLAGGED_QUESTION, x, y);
				break;
			default:
				throw new Error(`Command ${commandName} is not valid.`);
		}

		return res.send(matchService.executeCommand(command));
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

router.delete('/:playerId/match/:matchId', async (req: Request, res: Response) => {
	try {
		const matchId = String(req.query?.matchId);
		return res.send(matchService.deleteMatch(matchId));
	} catch (err) {
		return res.send(errorMsg(err.msg));
	}
});

export default router;
