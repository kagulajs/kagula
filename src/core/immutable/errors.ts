/**
 * Base error class for all errors in the Kagula.
 */
export class KagulaError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

/**
 * Error thrown when an invalid argument is provided to a function or class.
 */
export class InvalidArgumentError extends KagulaError {}
