import type { MidiClip } from "./clip.js";
import type { Track } from "./track.js";
import type { Ticks } from "./values/ticks.js";

/**
 * Interface for a MIDI track that can contain MIDI clips.
 *
 * MidiTrack extends the base Track interface and adds MIDI-specific
 * methods for managing MIDI clips.
 */
export interface MidiTrack extends Track {
	/**
	 * Inserts a new MIDI clip into the track at the specified position.
	 *
	 * @param startTime - The start time position for the new clip in ticks
	 * @param length - The duration of the new clip in ticks
	 * @returns The created MIDI clip
	 */
	insertMidiClip(startTime: Ticks, length: Ticks): MidiClip;

	/**
	 * Removes a clip from the track by its ID.
	 *
	 * @param clipId - The ID of the clip to remove
	 */
	removeClip(clipId: string): void;

	/**
	 * Gets all clips in this track.
	 *
	 * @returns An array of all MIDI clips in the track
	 */
	getClips(): MidiClip[];

	/**
	 * Gets a clip by its ID.
	 *
	 * @param clipId - The ID of the clip to retrieve
	 * @returns The clip with the specified ID, or undefined if not found
	 */
	getClipById(clipId: string): MidiClip | undefined;
}
