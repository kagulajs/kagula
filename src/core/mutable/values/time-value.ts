import { InvalidArgumentError } from "../errors.js";

/**
 * Base class for time-related value objects.
 */
export abstract class TimeValue {
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
