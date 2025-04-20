import { InvalidArgumentError } from "../errors.js";
import { TimeValue } from "./time-value.js";

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
}
