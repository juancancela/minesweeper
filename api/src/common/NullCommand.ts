import { Command } from './Command';

/**
 * Null Object class to safely initialize commands
 */
export class NullCommand implements Command<any> {
	execute() {
		return;
	}
}
