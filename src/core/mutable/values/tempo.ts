import { InvalidArgumentError } from "../errors.js";

/**
 * Represents a tempo value in beats per minute (BPM).
 *
 * Valid tempo values are positive numbers, typically between 20 and 300 BPM.
 *
 * @example
 * ```ts
 * const tempo = new Tempo(120); // 120 BPM
 * console.log(tempo.value); // 120
 * ```
 */
export class Tempo {
	/** The tempo value in beats per minute (BPM). */
	readonly value: number;

	/**
	 * @param value - Tempo value in BPM (must be positive)
	 * @throws {InvalidArgumentError} If value is not a valid tempo
	 */
	constructor(value: number) {
		if (typeof value !== "number" || Number.isNaN(value)) {
			throw new InvalidArgumentError(
				`Tempo value must be a number. Received: ${value}`,
			);
		}

		if (value <= 0) {
			throw new InvalidArgumentError(
				`Tempo value must be positive. Received: ${value}`,
			);
		}

		this.value = value;
	}
}
