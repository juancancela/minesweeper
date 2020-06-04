import { BaseModel } from '../common/BaseModel';

export class Player extends BaseModel {
	constructor(public id: string, public name: string) {
		super(id);
		this.name = name;
	}
}
