/**
 * Interface to be implemented for all commands executed through Services.
 */
export interface Command<T> {
	execute(): T;
}
