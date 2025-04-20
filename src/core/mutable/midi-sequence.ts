import type { MidiNote } from "./midi-note.js";
import type { MidiPitch, MidiVelocity } from "./midi-values.js";
import type { Ticks } from "./values/ticks.js";

/**
 * Interface for a MIDI sequence that contains a collection of MIDI notes.
 *
 * MidiSequence provides methods to add, remove, and query notes within a sequence.
 * This is a mutable implementation that allows direct modification of the sequence.
 */
export interface MidiSequence {
	/**
	 * Adds a note to the sequence with the specified parameters.
	 *
	 * @param pitch - The pitch of the note
	 * @param velocity - The velocity (intensity) of the note
	 * @param startTime - The start time relative to the clip start in ticks
	 * @param duration - The duration of the note in ticks
	 * @returns The created MidiNote instance
	 */
	addNote(
		pitch: MidiPitch,
		velocity: MidiVelocity,
		startTime: Ticks,
		duration: Ticks,
	): MidiNote;

	/**
	 * Removes a note from the sequence by its ID.
	 *
	 * @param noteId - The ID of the note to remove
	 */
	removeNote(noteId: string): void;

	/**
	 * Gets a note by its ID.
	 *
	 * @param noteId - The ID of the note to retrieve
	 * @returns The note with the specified ID, or undefined if not found
	 */
	getNoteById(noteId: string): MidiNote | undefined;

	/**
	 * Gets all notes in the sequence.
	 *
	 * @returns An array of all notes in the sequence
	 */
	getNotes(): MidiNote[];

	/**
	 * Gets all notes within a specific time range.
	 *
	 * @param startTime - The start time of the range in ticks
	 * @param endTime - The end time of the range in ticks
	 * @returns An array of notes within the specified range
	 */
	getNotesInRange(startTime: Ticks, endTime: Ticks): MidiNote[];
}
