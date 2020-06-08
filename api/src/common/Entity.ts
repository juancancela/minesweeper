/**
 * Base class for all models that are persisted.
 */
export abstract class Entity {
	private id: string = '';

	getId(): string {
		return this.id;
	}

	setId(id: string) {
		this.id = id;
	}
}
