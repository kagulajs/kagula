import { InvalidArgumentError } from "../errors.js";
import { TimeValue } from "./time-value.js";

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
}
