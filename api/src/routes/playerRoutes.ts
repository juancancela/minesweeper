import express from 'express';
import { Request, Response } from 'express';
import services from '../services';
import { UpdateCellCommand } from '../services/MatchServiceCommands';
import { CellStateType } from '../models/CellStateType';
import { NullCommand } from '../common/NullCommand';
import { responseError, responseOk } from '../common/utils/service';

const { matchService, playerService } = services;
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const id = String(req.params?.id);
		return res.send(responseOk(playerService.getPlayer(id)));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.get('/:playerId/match', async (req: Request, res: Response) => {
	try {
		const playerId = String(req.params?.playerId);
		const result = await matchService.getMatchesByPlayerId(playerId);
		return res.send(responseOk(result));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.post('/:playerId/match', async (req: Request, res: Response) => {
	try {
		const playerId = String(req.params?.playerId);
		const { rows, cols, bombs } = req.body;
		const match = await matchService.createMath(playerId, rows, cols, bombs);
		return res.send(responseOk(match));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.get('/:playerId/match/:matchId', async (req: Request, res: Response) => {
	try {
		const matchId = req.params?.matchId;
		const match = await matchService.getMatchById(matchId);
		return res.send(responseOk(match));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.post('/:playerId/match/:matchId', async (req: Request, res: Response) => {
	try {
		const matchId = String(req.params?.matchId);
		await matchService.saveMatch(matchId);
		return res.status(201).send(responseOk('ok'));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.post('/:playerId/match/:matchId/command', async (req: Request, res: Response) => {
	try {
		const matchId = String(req.params?.matchId);
		const x = Number(req.body?.x);
		const y = Number(req.body?.y);
		const commandName = req.body.name;
		const { FLAGGED_QUESTION, FLAGGED_RED, UNCOVERED } = CellStateType;
		let command = new NullCommand();

		switch (commandName) {
			case UNCOVERED:
				command = new UpdateCellCommand(matchId, commandName, x, y);
				break;
			case FLAGGED_RED:
				command = new UpdateCellCommand(matchId, commandName, x, y);
				break;
			case FLAGGED_QUESTION:
				command = new UpdateCellCommand(matchId, commandName, x, y);
				break;
			default:
				throw new Error(`Command ${commandName} is not valid.`);
		}

		const result = await matchService.executeCommand(command);
		return res.send(responseOk(result));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

router.delete('/:playerId/match/:matchId', async (req: Request, res: Response) => {
	try {
		const matchId = String(req.params?.matchId);
		const result = matchService.deleteMatch(matchId);
		return res.send(responseOk(result));
	} catch (err) {
		return res.send(responseError(err.message));
	}
});

export default router;
