import type { AudioTrack } from "./audio-track.js";
import type { MidiTrack } from "./midi-track.js";
import type { Project } from "./project.js";
import type { Pan } from "./values/pan.js";
import type { Volume } from "./values/volume.js";

/**
 * Interface for a track that can contain clips.
 *
 * Track is the base interface for all track types (audio, MIDI, etc.) and provides
 * common properties and methods for managing track settings.
 */
export interface Track {
	/**
	 * Gets the unique identifier for the track.
	 * This is read-only and cannot be changed after creation.
	 *
	 * @returns The track's unique identifier
	 */
	getId(): string;

	/**
	 * Gets the parent project that contains this track.
	 *
	 * @returns The parent project
	 */
	getProject(): Project;

	/**
	 * Gets the name of the track.
	 *
	 * @returns The track name
	 */
	getName(): string;

	/**
	 * Sets the name of the track.
	 *
	 * @param name - The new track name
	 */
	setName(name: string): void;

	/**
	 * Gets the volume of the track.
	 *
	 * @returns The track volume
	 */
	getVolume(): Volume;

	/**
	 * Sets the volume of the track.
	 *
	 * @param volume - The new track volume
	 */
	setVolume(volume: Volume): void;

	/**
	 * Gets the pan position of the track.
	 *
	 * @returns The track pan position
	 */
	getPan(): Pan;

	/**
	 * Sets the pan position of the track.
	 *
	 * @param pan - The new track pan position
	 */
	setPan(pan: Pan): void;

	/**
	 * Checks if the track is muted.
	 *
	 * @returns True if the track is muted, false otherwise
	 */
	isMuted(): boolean;

	/**
	 * Sets the muted state of the track.
	 *
	 * @param muted - The new muted state
	 */
	setMuted(muted: boolean): void;

	/**
	 * Checks if the track is soloed.
	 *
	 * @returns True if the track is soloed, false otherwise
	 */
	isSolo(): boolean;

	/**
	 * Sets the solo state of the track.
	 *
	 * @param solo - The new solo state
	 */
	setSolo(solo: boolean): void;

	/**
	 * Type guard to check if this track is an audio track.
	 *
	 * @returns True if this track is an audio track, false otherwise
	 */
	isAudioTrack(): this is AudioTrack;

	/**
	 * Type guard to check if this track is a MIDI track.
	 *
	 * @returns True if this track is a MIDI track, false otherwise
	 */
	isMidiTrack(): this is MidiTrack;
}
