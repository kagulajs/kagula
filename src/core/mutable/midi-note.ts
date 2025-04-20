import type { MidiPitch, MidiVelocity } from "./midi-values.js";
import type { Ticks } from "./values/ticks.js";

/**
 * Interface for a MIDI note within a sequence.
 *
 * MidiNote represents a musical note with properties like pitch, velocity,
 * start time, and duration. This interface provides methods to directly
 * modify the note's properties.
 */
export interface MidiNote {
	/**
	 * Unique identifier for the note.
	 * This is read-only and cannot be changed after creation.
	 */
	readonly id: string;

	/**
	 * The pitch of the note.
	 */
	readonly pitch: MidiPitch;

	/**
	 * The velocity (intensity) of the note.
	 */
	readonly velocity: MidiVelocity;

	/**
	 * The start time of the note relative to the clip start in ticks.
	 */
	readonly startTime: Ticks;

	/**
	 * The duration of the note in ticks.
	 */
	readonly duration: Ticks;

	/**
	 * Sets the pitch of the note.
	 *
	 * @param pitch - The new pitch value
	 */
	setPitch(pitch: MidiPitch): void;

	/**
	 * Sets the velocity of the note.
	 *
	 * @param velocity - The new velocity value
	 */
	setVelocity(velocity: MidiVelocity): void;

	/**
	 * Sets the start time of the note relative to the clip start.
	 *
	 * @param startTime - The new start time in ticks
	 */
	setStartTime(startTime: Ticks): void;

	/**
	 * Sets the duration of the note.
	 *
	 * @param duration - The new duration in ticks
	 */
	setDuration(duration: Ticks): void;
}
