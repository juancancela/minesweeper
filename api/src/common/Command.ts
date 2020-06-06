export interface Command<T> {
	execute(): T;
}
