import { InvalidArgumentError } from "../errors.js";
import { Ticks } from "../values/time.js";

/**
 * Base class for all events.
 *
 * Events represent actions or data points that occur at specific times.
 */
export abstract class Event {
	/** The time at which the event occurs. */
	readonly time: Ticks;

	/**
	 * @param time - The time at which the event occurs
	 * @throws {InvalidArgumentError} If time is not a valid Ticks instance
	 */
	constructor(time: Ticks) {
		if (!(time instanceof Ticks)) {
			throw new InvalidArgumentError(
				`Event time must be a Ticks instance. Received: ${time}`,
			);
		}

		this.time = time;
	}
}
