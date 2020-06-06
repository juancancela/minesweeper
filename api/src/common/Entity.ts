export abstract class Entity {
	private id: string = '';

	getId(): string {
		return this.id;
	}

	setId(id: string) {
		this.id = id;
	}
}
