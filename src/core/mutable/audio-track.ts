import type { AudioSource } from "./audio-source.js";
import type { AudioClip } from "./clip.js";
import type { Track } from "./track.js";
import type { Ticks } from "./values/ticks.js";

/**
 * Interface for an audio track that can contain audio clips.
 *
 * AudioTrack extends the base Track interface and adds audio-specific
 * methods for managing audio clips.
 */
export interface AudioTrack extends Track {
	/**
	 * Inserts a new audio clip into the track at the specified position.
	 *
	 * @param source - The audio source for the new clip
	 * @param startTime - The start time position in ticks
	 * @returns The created audio clip
	 */
	insertAudioClip(source: AudioSource, startTime: Ticks): AudioClip;

	/**
	 * Removes a clip from the track by its ID.
	 *
	 * @param clipId - The ID of the clip to remove
	 */
	removeClip(clipId: string): void;

	/**
	 * Gets all clips in this track.
	 *
	 * @returns An array of all audio clips in the track
	 */
	getClips(): AudioClip[];

	/**
	 * Gets a clip by its ID.
	 *
	 * @param clipId - The ID of the clip to retrieve
	 * @returns The clip with the specified ID, or undefined if not found
	 */
	getClipById(clipId: string): AudioClip | undefined;
}
