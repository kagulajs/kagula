import { InvalidArgumentError } from "./errors.js";

/**
 * Represents a time value in seconds.
 *
 * Used for representing any time-related measurements or positions.
 * Values are always non-negative.
 *
 * @example
 * ```ts
 * const timeValue = new Seconds(10.5);
 * console.log(timeValue.value); // 10.5
 * ```
 */
export class Seconds {
	/** The time value in seconds (non-negative). */
	readonly value: number;

	/**
	 * @param value - Time in seconds (non-negative)
	 * @throws {InvalidArgumentError} If value is negative
	 */
	constructor(value: number) {
		if (value < 0) {
			throw new InvalidArgumentError(
				`Seconds value cannot be negative. Received: ${value}`,
			);
		}

		this.value = value;
	}
}

/**
 * Represents a time value in ticks.
 *
 * Used for representing any time-related measurements or positions.
 * Values are always non-negative integers.
 *
 * @example
 * ```ts
 * const timeValue = new Ticks(42);
 * console.log(timeValue.value); // 42
 * ```
 */
export class Ticks {
	/** The time value in ticks (non-negative integer). */
	readonly value: number;

	/**
	 * @param value - Time in ticks (non-negative integer)
	 * @throws {InvalidArgumentError} If value is not a non-negative integer
	 */
	constructor(value: number) {
		if (!Number.isInteger(value)) {
			throw new InvalidArgumentError(
				`Ticks value must be an integer. Received: ${value}`,
			);
		}

		if (value < 0) {
			throw new InvalidArgumentError(
				`Ticks value cannot be negative. Received: ${value}`,
			);
		}

		this.value = value;
	}
}
