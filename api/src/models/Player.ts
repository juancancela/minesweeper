import { Entity } from '../common/Entity';

export class Player extends Entity {
	private name: string;
	private email: string;

	constructor(name: string, email: string) {
		super();
		this.name = name;
		this.email = email;
	}

	getName(): string {
		return this.name;
	}

	getEmail(): string {
		return this.email;
	}
}
