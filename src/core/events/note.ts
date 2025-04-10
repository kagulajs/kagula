import { InvalidArgumentError } from "../errors.js";
import { Ticks } from "../time.js";
import { Event } from "./base.js";
import { Pitch, Velocity } from "./values.js";

/**
 * Represents a note event.
 *
 * Note events contain information about a note, including its pitch,
 * velocity (intensity), and duration.
 *
 * @example
 * ```ts
 * const startTime = new Ticks(480);
 * const pitch = new Pitch(60);
 * const velocity = new Velocity(100);
 * const duration = new Ticks(240);
 * const note = new Note(startTime, pitch, velocity, duration);
 * ```
 */
export class Note extends Event {
	/** The pitch value of the note. */
	readonly pitch: Pitch;

	/** The velocity (intensity) of the note. */
	readonly velocity: Velocity;

	/** The duration of the note. */
	readonly duration: Ticks;

	/**
	 * @param time - The time at which the note starts
	 * @param pitch - The pitch value
	 * @param velocity - The velocity/intensity value
	 * @param duration - The duration of the note
	 * @throws {InvalidArgumentError} If any parameter is invalid
	 */
	constructor(time: Ticks, pitch: Pitch, velocity: Velocity, duration: Ticks) {
		super(time);

		// Validate pitch
		if (!(pitch instanceof Pitch)) {
			throw new InvalidArgumentError(
				`Note pitch must be a Pitch instance. Received: ${pitch}`,
			);
		}

		// Validate velocity
		if (!(velocity instanceof Velocity)) {
			throw new InvalidArgumentError(
				`Note velocity must be a Velocity instance. Received: ${velocity}`,
			);
		}

		// Validate duration
		if (!(duration instanceof Ticks)) {
			throw new InvalidArgumentError(
				`Note duration must be a Ticks instance. Received: ${duration}`,
			);
		}
		if (duration.value <= 0) {
			throw new InvalidArgumentError(
				`Note duration must be positive. Received: ${duration.value}`,
			);
		}

		this.pitch = pitch;
		this.velocity = velocity;
		this.duration = duration;
	}
}
