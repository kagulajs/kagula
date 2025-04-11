import { InvalidArgumentError } from "./errors.js";
import { Track } from "./track.js";

/**
 * Represents a project that contains a collection of tracks.
 *
 * Projects are the top-level container for organizing tracks and their events.
 * They follow an immutable pattern where operations return new instances.
 *
 * @example
 * ```ts
 * import { Track } from "./track.js";
 * import { Note } from "./events/note.js";
 * import { Pitch } from "./values/pitch.js";
 * import { Ticks } from "./values/time.js";
 * import { Velocity } from "./values/velocity.js";
 *
 * const project = new Project();
 * const track = Track.create();
 * const note = new Note(
 *   new Ticks(480),
 *   new Pitch(60),
 *   new Velocity(100),
 *   new Ticks(240)
 * );
 *
 * const updatedTrack = track.addEvent(note);
 * const updatedProject = project.addTrack(updatedTrack);
 * const retrievedTrack = project.getTrack(track.id);
 * ```
 */
export class Project {
	/** Map of track IDs to Track instances */
	private readonly tracks: ReadonlyMap<string, Track>;

	/**
	 * Creates a new project instance.
	 *
	 * @param tracks - Optional initial tracks to include in the project
	 */
	constructor(tracks: Track[] = []) {
		// Validate that all items in tracks are Track instances
		for (let i = 0; i < tracks.length; i++) {
			const track = tracks[i];
			if (!(track instanceof Track)) {
				throw new InvalidArgumentError(
					`All project tracks must be Track instances. Invalid track at index ${i}: ${track}`,
				);
			}
		}

		// Create a map of track IDs to Track instances
		const tracksMap = new Map<string, Track>();
		for (const track of tracks) {
			tracksMap.set(track.id, track);
		}

		this.tracks = tracksMap;
	}

	/**
	 * Adds a track to the project.
	 *
	 * @param track - The track to add
	 * @returns A new Project instance with the added track
	 * @throws {InvalidArgumentError} If the track is not a valid Track instance
	 */
	addTrack(track: Track): Project {
		if (!(track instanceof Track)) {
			throw new InvalidArgumentError(
				`Project track must be a Track instance. Received: ${track}`,
			);
		}

		// Get all current tracks as an array
		const currentTracks = Array.from(this.tracks.values());

		// Create a new array with all existing tracks plus the new one
		const newTracks = [...currentTracks, track];

		// Return a new Project instance with the updated tracks
		return new Project(newTracks);
	}

	/**
	 * Removes a track from the project by its ID.
	 *
	 * @param trackId - The ID of the track to remove
	 * @returns A new Project instance with the track removed
	 */
	removeTrack(trackId: string): Project {
		const currentTracks = Array.from(this.tracks.values());
		const newTracks = currentTracks.filter((t) => t.id !== trackId);
		return new Project(newTracks);
	}

	/**
	 * Gets all tracks in this project.
	 *
	 * @returns An array of all tracks in the project
	 */
	getTracks(): Track[] {
		return Array.from(this.tracks.values());
	}

	/**
	 * Gets a track by its ID.
	 *
	 * @param trackId - The ID of the track to get
	 * @returns The track with the specified ID, or undefined if not found
	 */
	getTrack(trackId: string): Track | undefined {
		return this.tracks.get(trackId);
	}

	/**
	 * Gets the number of tracks in this project.
	 *
	 * @returns The number of tracks in the project
	 */
	getTrackCount(): number {
		return this.tracks.size;
	}
}
