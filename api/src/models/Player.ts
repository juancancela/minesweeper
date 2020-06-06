import { Entity } from '../common/Entity';

export class Player extends Entity {
	private name: string;
	private email: string;
	private password: string;

	constructor(name: string, email: string, password: string) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}

	getName(): string {
		return this.name;
	}

	getEmail(): string {
		return this.email;
	}

	getPassword(): string {
		return this.password;
	}
}
