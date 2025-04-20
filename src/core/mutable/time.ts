import { InvalidArgumentError } from "./errors.js";

/**
 * Base class for time-related value objects.
 */
abstract class TimeValue {
	readonly value: number;

	constructor(value: number) {
		if (typeof value !== "number" || !Number.isFinite(value)) {
			throw new InvalidArgumentError("Time value must be a finite number");
		}
		this.value = value;
	}

	equals(other: TimeValue): boolean {
		return this.constructor === other.constructor && this.value === other.value;
	}
}

/**
 * Represents a position or duration in time measured in ticks.
 * This is the standard time unit used throughout the system.
 */
export class Ticks extends TimeValue {
	constructor(value: number) {
		super(value);
		if (value < 0) {
			throw new InvalidArgumentError("Tick value cannot be negative");
		}
	}

	/**
	 * Converts ticks to seconds based on the given tempo.
	 */
	toSeconds(ticksPerBeat: number, beatsPerMinute: number): Seconds {
		// Convert ticks to seconds: (ticks / ticksPerBeat) * (60 / bpm)
		const seconds = (this.value / ticksPerBeat) * (60 / beatsPerMinute);
		return new Seconds(seconds);
	}

	/**
	 * Creates a new Ticks instance with the sum of this and another duration.
	 */
	add(other: Ticks): Ticks {
		return new Ticks(this.value + other.value);
	}

	/**
	 * Creates a new Ticks instance with the difference between this and another duration.
	 * Will throw an error if the result would be negative.
	 */
	subtract(other: Ticks): Ticks {
		const result = this.value - other.value;
		if (result < 0) {
			throw new InvalidArgumentError("Resulting tick value cannot be negative");
		}
		return new Ticks(result);
	}
}

/**
 * Represents a position or duration in time measured in seconds.
 * This is used for real-time operations and conversions.
 */
export class Seconds extends TimeValue {
	constructor(value: number) {
		super(value);
		if (value < 0) {
			throw new InvalidArgumentError("Seconds value cannot be negative");
		}
	}

	/**
	 * Converts seconds to ticks based on the given tempo.
	 */
	toTicks(ticksPerBeat: number, beatsPerMinute: number): Ticks {
		// Convert seconds to ticks: (seconds * bpm / 60) * ticksPerBeat
		const ticks = ((this.value * beatsPerMinute) / 60) * ticksPerBeat;
		return new Ticks(Math.round(ticks)); // Round to nearest tick
	}

	/**
	 * Creates a new Seconds instance with the sum of this and another duration.
	 */
	add(other: Seconds): Seconds {
		return new Seconds(this.value + other.value);
	}

	/**
	 * Creates a new Seconds instance with the difference between this and another duration.
	 * Will throw an error if the result would be negative.
	 */
	subtract(other: Seconds): Seconds {
		const result = this.value - other.value;
		if (result < 0) {
			throw new InvalidArgumentError(
				"Resulting seconds value cannot be negative",
			);
		}
		return new Seconds(result);
	}
}
