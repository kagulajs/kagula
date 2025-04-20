import type { AudioSource } from "./audio-source.js";
import type { MidiSequence } from "./midi-sequence.js";
import type { Track } from "./track.js";
import type { Ticks } from "./values/ticks.js";

/**
 * Interface for a clip that can be placed on a track.
 *
 * Clip is the base interface for all clip types (audio, MIDI, etc.) and provides
 * common properties and methods for managing clip position and length.
 */
export interface Clip {
	/**
	 * Gets the unique identifier for the clip.
	 * This is read-only and cannot be changed after creation.
	 *
	 * @returns The clip's unique identifier
	 */
	getId(): string;

	/**
	 * Gets the parent track that contains this clip.
	 *
	 * @returns The parent track
	 */
	getTrack(): Track;

	/**
	 * Gets the start time of the clip on the track timeline.
	 *
	 * @returns The absolute start time position in ticks
	 */
	getStartTime(): Ticks;

	/**
	 * Sets the start time of the clip on the track timeline.
	 *
	 * @param startTime - The new absolute start time position in ticks
	 */
	setStartTime(startTime: Ticks): void;

	/**
	 * Gets the length of the clip.
	 *
	 * @returns The clip duration in ticks
	 */
	getLength(): Ticks;

	/**
	 * Sets the length of the clip.
	 *
	 * @param length - The new clip duration in ticks
	 */
	setLength(length: Ticks): void;

	/**
	 * Gets the end time of the clip on the track timeline.
	 * This is a calculated value based on start time and length.
	 *
	 * @returns The absolute end time position in ticks
	 */
	getEndTime(): Ticks;
}

/**
 * Interface for an audio clip that can be placed on an audio track.
 *
 * AudioClip extends the base Clip interface and adds audio-specific
 * properties and methods.
 */
export interface AudioClip extends Clip {
	/**
	 * Gets the audio source for this clip.
	 *
	 * @returns The audio source
	 */
	getSource(): AudioSource;

	/**
	 * Sets the audio source for this clip.
	 *
	 * @param source - The new audio source
	 */
	setSource(source: AudioSource): void;

	// Additional audio-specific methods can be added here
}

/**
 * Interface for a MIDI clip that can be placed on a MIDI track.
 *
 * MidiClip extends the base Clip interface and adds MIDI-specific
 * properties and methods for accessing and manipulating MIDI data.
 */
export interface MidiClip extends Clip {
	/**
	 * Gets the MIDI sequence associated with this clip.
	 * The sequence contains all the MIDI notes and other MIDI events.
	 *
	 * @returns The MIDI sequence
	 */
	getSequence(): MidiSequence;
}
