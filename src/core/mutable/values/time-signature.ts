import { InvalidArgumentError } from "../errors.js";

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
