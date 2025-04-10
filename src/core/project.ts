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
 * const track = new Track();
 * const note = new Note(
 *   new Ticks(480),
 *   new Pitch(60),
 *   new Velocity(100),
 *   new Ticks(240)
 * );
 *
 * const updatedTrack = track.addEvent(note);
 * const updatedProject = project.addTrack(updatedTrack);
 * ```
 */
export class Project {
	/** The tracks contained in this project. */
	private readonly tracks: ReadonlyArray<Track>;

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

		this.tracks = [...tracks];
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

		// Create a new array with all existing tracks plus the new one
		const newTracks = [...this.tracks, track];

		// Return a new Project instance with the updated tracks
		return new Project(newTracks);
	}

	/**
	 * Removes a track from the project.
	 *
	 * @param track - The track to remove
	 * @returns A new Project instance with the track removed
	 */
	removeTrack(track: Track): Project {
		const newTracks = this.tracks.filter((t) => t !== track);
		return new Project(newTracks);
	}

	/**
	 * Gets all tracks in this project.
	 *
	 * @returns An array of all tracks in the project
	 */
	getTracks(): Track[] {
		return this.tracks as Track[];
	}

	/**
	 * Gets a track at the specified index.
	 *
	 * @param index - The index of the track to get
	 * @returns The track at the specified index, or undefined if the index is out of bounds
	 */
	getTrackAt(index: number): Track | undefined {
		if (index < 0 || index >= this.tracks.length) {
			return undefined;
		}
		return this.tracks[index];
	}

	/**
	 * Gets the number of tracks in this project.
	 *
	 * @returns The number of tracks in the project
	 */
	getTrackCount(): number {
		return this.tracks.length;
	}
}
