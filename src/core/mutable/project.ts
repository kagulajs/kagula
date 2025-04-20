import type { AudioTrack } from "./audio-track.js";
import type { MidiTrack } from "./midi-track.js";
import type { Track } from "./track.js";
import type { Tempo } from "./values/tempo.js";
import type { TimeSignature } from "./values/time-signature.js";

/**
 * Interface for a project that manages tracks and global settings.
 *
 * Project is the main entry point for managing a project and serves as the
 * central point for track management and global settings.
 */
export interface Project {
	/**
	 * Adds a new audio track to the project.
	 *
	 * @param index - Optional index at which to insert the track. If not provided, the track is added at the end.
	 * @returns The created audio track
	 */
	addAudioTrack(index?: number): AudioTrack;

	/**
	 * Adds a new MIDI track to the project.
	 *
	 * @param index - Optional index at which to insert the track. If not provided, the track is added at the end.
	 * @returns The created MIDI track
	 */
	addMidiTrack(index?: number): MidiTrack;

	/**
	 * Removes a track from the project by its ID.
	 *
	 * @param trackId - The ID of the track to remove
	 */
	removeTrack(trackId: string): void;

	/**
	 * Moves a track to a new position in the track list.
	 *
	 * @param trackId - The ID of the track to move
	 * @param newIndex - The new index for the track
	 */
	moveTrack(trackId: string, newIndex: number): void;

	/**
	 * Gets all tracks in the project.
	 *
	 * @returns An array of all tracks in the project
	 */
	getTracks(): Track[];

	/**
	 * Gets a track by its ID.
	 *
	 * @param trackId - The ID of the track to retrieve
	 * @returns The track with the specified ID, or undefined if not found
	 */
	getTrackById(trackId: string): Track | undefined;

	/**
	 * Gets the global tempo setting.
	 *
	 * @returns The current tempo
	 */
	getTempo(): Tempo;

	/**
	 * Sets the global tempo setting.
	 *
	 * @param tempo - The new tempo
	 */
	setTempo(tempo: Tempo): void;

	/**
	 * Gets the global time signature setting.
	 *
	 * @returns The current time signature
	 */
	getTimeSignature(): TimeSignature;

	/**
	 * Sets the global time signature setting.
	 *
	 * @param timeSignature - The new time signature
	 */
	setTimeSignature(timeSignature: TimeSignature): void;

	/**
	 * Gets the sample rate used by the project.
	 *
	 * @returns The sample rate in Hz
	 */
	getSampleRate(): number;
}
