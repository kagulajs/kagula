import { InvalidArgumentError } from "../errors.js";

/**
 * Represents a pan value.
 *
 * Valid pan values are numbers between -1 and 1,
 * where -1 represents full left, 0 represents center, and 1 represents full right.
 *
 * @example
 * ```ts
 * const pan = new Pan(-0.5); // Panned slightly to the left
 * console.log(pan.value); // -0.5
 * ```
 */
export class Pan {
	/** The pan value (number between -1 and 1). */
	readonly value: number;

	/**
	 * @param value - Pan value (-1 to 1)
	 * @throws {InvalidArgumentError} If value is not a valid pan
	 */
	constructor(value: number) {
		if (typeof value !== "number" || Number.isNaN(value)) {
			throw new InvalidArgumentError(
				`Pan value must be a number. Received: ${value}`,
			);
		}

		if (value < -1 || value > 1) {
			throw new InvalidArgumentError(
				`Pan value must be between -1 and 1. Received: ${value}`,
			);
		}

		this.value = value;
	}
}
