import { InvalidArgumentError } from "../errors.js";

/**
 * Represents a velocity value.
 *
 * Valid velocity values are integers between 0 and 127,
 * where 0 typically represents no sound and 127 represents maximum intensity.
 *
 * @example
 * ```ts
 * const velocity = new Velocity(100); // Fairly loud
 * console.log(velocity.value); // 100
 * ```
 */
export class Velocity {
	/** The velocity value (integer between 0 and 127). */
	readonly value: number;

	/**
	 * @param value - Velocity value (0-127)
	 * @throws {InvalidArgumentError} If value is not a valid velocity
	 */
	constructor(value: number) {
		if (!Number.isInteger(value)) {
			throw new InvalidArgumentError(
				`Velocity value must be an integer. Received: ${value}`,
			);
		}

		if (value < 0 || value > 127) {
			throw new InvalidArgumentError(
				`Velocity value must be between 0 and 127. Received: ${value}`,
			);
		}

		this.value = value;
	}
}
