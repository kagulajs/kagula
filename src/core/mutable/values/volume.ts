import { InvalidArgumentError } from "../errors.js";

/**
 * Represents a volume value.
 *
 * Valid volume values are numbers between 0 and 1,
 * where 0 represents silence and 1 represents maximum volume.
 *
 * @example
 * ```ts
 * const volume = new Volume(0.8); // 80% volume
 * console.log(volume.value); // 0.8
 * ```
 */
export class Volume {
	/** The volume value (number between 0 and 1). */
	readonly value: number;

	/**
	 * @param value - Volume value (0-1)
	 * @throws {InvalidArgumentError} If value is not a valid volume
	 */
	constructor(value: number) {
		if (typeof value !== "number" || Number.isNaN(value)) {
			throw new InvalidArgumentError(
				`Volume value must be a number. Received: ${value}`,
			);
		}

		if (value < 0 || value > 1) {
			throw new InvalidArgumentError(
				`Volume value must be between 0 and 1. Received: ${value}`,
			);
		}

		this.value = value;
	}
}
