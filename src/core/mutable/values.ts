import { InvalidArgumentError } from "./errors.js";

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

/**
 * Represents a time signature.
 *
 * A time signature consists of a numerator (top number) and a denominator (bottom number).
 * The numerator represents the number of beats in a measure, and the denominator represents
 * the note value that receives one beat.
 *
 * @example
 * ```ts
 * const timeSignature = new TimeSignature(4, 4); // 4/4 time
 * console.log(timeSignature.numerator); // 4
 * console.log(timeSignature.denominator); // 4
 * ```
 */
export class TimeSignature {
	/** The numerator (top number) of the time signature. */
	readonly numerator: number;

	/** The denominator (bottom number) of the time signature. */
	readonly denominator: number;

	/**
	 * @param numerator - The numerator (top number) of the time signature
	 * @param denominator - The denominator (bottom number) of the time signature
	 * @throws {InvalidArgumentError} If either value is not valid for a time signature
	 */
	constructor(numerator: number, denominator: number) {
		if (!Number.isInteger(numerator) || numerator <= 0) {
			throw new InvalidArgumentError(
				`Time signature numerator must be a positive integer. Received: ${numerator}`,
			);
		}

		// Denominator must be a power of 2 (1, 2, 4, 8, 16, etc.)
		if (
			!Number.isInteger(denominator) ||
			denominator <= 0 ||
			(denominator & (denominator - 1)) !== 0
		) {
			throw new InvalidArgumentError(
				`Time signature denominator must be a positive power of 2. Received: ${denominator}`,
			);
		}

		this.numerator = numerator;
		this.denominator = denominator;
	}
}
