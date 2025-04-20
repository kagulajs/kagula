import { generateId } from "../../lib/id.js";
import { InvalidArgumentError } from "../errors.js";
import { Ticks } from "../values/time.js";

/**
 * Base class for all events.
 *
 * Events represent actions or data points that occur at specific times.
 */
export abstract class Event {
	/** The unique identifier for this event. */
	readonly id: string;

	/** The time at which the event occurs. */
	readonly time: Ticks;

	/**
	 * Creates a new event with the specified ID and time.
	 *
	 * @param id - The unique identifier for this event
	 * @param time - The time at which the event occurs
	 * @throws {InvalidArgumentError} If time is not a valid Ticks instance
	 */
	constructor(id: string, time: Ticks) {
		if (!(time instanceof Ticks)) {
			throw new InvalidArgumentError(
				`Event time must be a Ticks instance. Received: ${time}`,
			);
		}

		this.id = id;
		this.time = time;
	}

	/**
	 * Creates a new event with the specified time and an auto-generated ID.
	 * This method should be implemented by subclasses.
	 *
	 * @param time - The time at which the event occurs
	 * @param args - Additional arguments required by subclasses
	 * @returns A new event instance with an auto-generated ID
	 * @throws {InvalidArgumentError} If time is not a valid Ticks instance
	 */
	static create(time: Ticks, ...args: unknown[]): Event {
		throw new Error("The create method must be implemented by subclasses");
	}
}
