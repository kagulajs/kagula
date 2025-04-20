import { InvalidArgumentError } from "../errors.js";

/**
 * Represents a pitch value.
 *
 * Valid pitch values are integers between 0 and 127.
 *
 * @example
 * ```ts
 * const pitch = new Pitch(60); // Middle C
 * console.log(pitch.value); // 60
 * ```
 */
export class Pitch {
	/** The pitch value (integer between 0 and 127). */
	readonly value: number;

	/**
	 * @param value - Pitch value (0-127)
	 * @throws {InvalidArgumentError} If value is not a valid pitch
	 */
	constructor(value: number) {
		if (!Number.isInteger(value)) {
			throw new InvalidArgumentError(
				`Pitch value must be an integer. Received: ${value}`,
			);
		}

		if (value < 0 || value > 127) {
			throw new InvalidArgumentError(
				`Pitch value must be between 0 and 127. Received: ${value}`,
			);
		}

		this.value = value;
	}
}
