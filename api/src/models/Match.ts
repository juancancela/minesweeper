import { BaseModel } from '../common/BaseModel';

export class Match extends BaseModel {
	constructor(public id: string, public playerId: string) {
		super(id);
		this.playerId = playerId;
	}
}
