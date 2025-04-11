import { InvalidArgumentError } from "./errors.js";
import { Event } from "./events/base.js";
import { generateId } from "../lib/id.js";

/**
 * Represents a track that contains a collection of events.
 *
 * Tracks are used to organize events and can be added to a project.
 * They follow an immutable pattern where operations return new instances.
 *
 * @example
 * ```ts
 * import { Note } from "./events/note.js";
 * import { Pitch } from "./values/pitch.js";
 * import { Ticks } from "./values/time.js";
 * import { Velocity } from "./values/velocity.js";
 *
 * const track = new Track();
 * const note = new Note(
 *   new Ticks(480),
 *   new Pitch(60),
 *   new Velocity(100),
 *   new Ticks(240)
 * );
 * const updatedTrack = track.addEvent(note);
 * ```
 */
export class Track {
	/** Unique identifier for the track */
	readonly id: string;

	/** The events contained in this track, sorted by time. */
	private readonly events: ReadonlyArray<Event>;

	/**
	 * Creates a new track instance.
	 *
	 * @param id - Unique identifier for the track
	 * @param events - Optional initial events to include in the track
	 */
	constructor(id: string, events: Event[] = []) {
		this.id = id;

		// Validate that all items in events are Event instances
		for (let i = 0; i < events.length; i++) {
			const event = events[i];
			if (!(event instanceof Event)) {
				throw new InvalidArgumentError(
					`All track events must be Event instances. Invalid event at index ${i}: ${event}`,
				);
			}
		}

		// Create a sorted copy of the events array
		this.events = [...events].sort((a, b) => a.time.value - b.time.value);
	}

	/**
	 * Creates a new track instance with an automatically generated ID.
	 *
	 * @param events - Optional initial events to include in the track
	 * @returns A new Track instance with a generated ID
	 */
	static create(events: Event[] = []): Track {
		return new Track(generateId(), events);
	}

	/**
	 * Adds an event to the track.
	 *
	 * @param event - The event to add
	 * @returns A new Track instance with the added event
	 * @throws {InvalidArgumentError} If the event is not a valid Event instance
	 */
	addEvent(event: Event): Track {
		if (!(event instanceof Event)) {
			throw new InvalidArgumentError(
				`Track event must be an Event instance. Received: ${event}`,
			);
		}

		// Create a new array with all existing events plus the new one
		const newEvents = [...this.events, event];

		// Return a new Track instance with the updated events
		return new Track(this.id, newEvents);
	}

	/**
	 * Removes an event from the track by its ID.
	 *
	 * @param eventId - The ID of the event to remove
	 * @returns A new Track instance with the event removed
	 */
	removeEvent(eventId: string): Track {
		const newEvents = this.events.filter((e) => e.id !== eventId);
		return new Track(this.id, newEvents);
	}

	/**
	 * Gets all events within a specific time range.
	 *
	 * @param startTicks - The start time in ticks
	 * @param endTicks - The end time in ticks
	 * @returns An array of events within the specified range
	 */
	getEventsInRange(startTicks: number, endTicks: number): Event[] {
		if (startTicks < 0 || endTicks < startTicks) {
			throw new InvalidArgumentError(
				`Invalid time range: start=${startTicks}, end=${endTicks}`,
			);
		}

		return this.events.filter(
			(event) => event.time.value >= startTicks && event.time.value <= endTicks,
		) as Event[];
	}

	/**
	 * Gets all events in this track.
	 *
	 * @returns An array of all events in the track
	 */
	getEvents(): Event[] {
		return this.events as Event[];
	}
}
