import { InvalidArgumentError } from "./errors.js";
import { Event } from "./events/base.js";
import { Note } from "./events/note.js";
import { type ITrack, Track, type TrackProps } from "./track.js";
import type { Pitch } from "./values/pitch.js";
import type { Ticks } from "./values/time.js";
import type { Velocity } from "./values/velocity.js";

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
 *
 * // Create a new track through the project
 * const [project2, pianoTrack] = project.addTrack({ name: "Piano" });
 * const pianoTrackId = pianoTrack.id;
 *
 * // Create a note
 * const note = new Note(
 *   new Ticks(480),
 *   new Pitch(60),
 *   new Velocity(100),
 *   new Ticks(240)
 * );
 *
 * // Add the note to the track through the project
 * const project3 = project2.addEvent(pianoTrackId, note);
 *
 * // Retrieve the track
 * const retrievedTrack = project3.getTrack(pianoTrackId);
 * ```
 */
export class Project {
	/** Map of track IDs to Track instances */
	private readonly tracks: ReadonlyMap<string, Track>;

	/** Cached array of all tracks for performance */
	private readonly tracksArray: ReadonlyArray<Track>;

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
		this.tracksArray = tracks;
	}

	/**
	 * Creates a new track with the given properties and adds it to the project.
	 *
	 * @param props - Optional properties for the new track
	 * @returns A tuple containing the new Project instance and the created Track as ITrack
	 */
	addTrack(props?: TrackProps): [Project, ITrack] {
		// Create a new track with the given properties
		const track = Track.create(props);

		// Add the track to the project
		const newProject = this.addTrackInstance(track);

		// Return both the new project and the created track
		return [newProject, track];
	}

	/**
	 * Adds an existing track instance to the project.
	 * This is an internal method used by addTrack.
	 *
	 * @param track - The track to add
	 * @returns A new Project instance with the added track
	 * @throws {InvalidArgumentError} If the track is not a valid Track instance
	 * @internal
	 */
	private addTrackInstance(track: Track): Project {
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
	 * @returns An array of all tracks in the project as ITrack
	 */
	getTracks(): ITrack[] {
		return Array.from(this.tracks.values());
	}

	/**
	 * Gets a track by its ID.
	 *
	 * @param trackId - The ID of the track to get
	 * @returns The track with the specified ID as ITrack, or undefined if not found
	 */
	getTrack(trackId: string): ITrack | undefined {
		return this.getTrackInternal(trackId);
	}

	/**
	 * Gets a track by its ID for internal use.
	 * This method is for internal use only and returns the full Track instance.
	 *
	 * @param trackId - The ID of the track to get
	 * @returns The track with the specified ID, or undefined if not found
	 * @internal
	 */
	private getTrackInternal(trackId: string): Track | undefined {
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

	/**
	 * Adds a note event to a specific track in the project.
	 *
	 * @param trackId - The ID of the track to add the note to
	 * @param time - The time at which the note starts
	 * @param pitch - The pitch value
	 * @param velocity - The velocity/intensity value
	 * @param duration - The duration of the note
	 * @returns A tuple containing the new Project instance and the created Note
	 * @throws {InvalidArgumentError} If the track is not found or any parameter is invalid
	 */
	addNoteEvent(
		trackId: string,
		time: Ticks,
		pitch: Pitch,
		velocity: Velocity,
		duration: Ticks,
	): [Project, Note] {
		// Create a new note event
		const note = Note.create(time, pitch, velocity, duration);

		// Add the note to the project
		const newProject = this.addEventInternal(trackId, note);

		// Return both the new project and the created note
		return [newProject, note];
	}

	/**
	 * Adds an event to a specific track in the project.
	 *
	 * @param trackId - The ID of the track to add the event to
	 * @param event - The event to add
	 * @returns A new Project instance with the added event
	 * @throws {InvalidArgumentError} If the track is not found or event is not a valid Event instance
	 */
	private addEventInternal(trackId: string, event: Event): Project {
		// Get the track and ensure it exists
		const track = this.getTrackInternal(trackId);
		if (!track) {
			throw new InvalidArgumentError(
				`Cannot add event to track: Track with ID ${trackId} not found`,
			);
		}

		if (!(event instanceof Event)) {
			throw new InvalidArgumentError(
				`Event must be an Event instance. Received: ${event}`,
			);
		}

		// Create a new track with the added event
		const updatedTrack = track.addEvent(event);

		// Get all current tracks as an array
		const currentTracks = this.tracksArray;

		// Create a new array with the updated track replacing the old one
		const newTracks = currentTracks.map((t) =>
			t.id === trackId ? updatedTrack : t,
		);

		// Return a new Project instance with the updated tracks
		return new Project(newTracks);
	}

	/**
	 * Removes an event from a specific track in the project.
	 *
	 * @param trackId - The ID of the track to remove the event from
	 * @param eventId - The ID of the event to remove
	 * @returns A new Project instance with the event removed
	 * @throws {InvalidArgumentError} If the track is not found
	 */
	removeEvent(trackId: string, eventId: string): Project {
		// Get the track and ensure it exists
		const track = this.getTrackInternal(trackId);
		if (!track) {
			throw new InvalidArgumentError(
				`Cannot remove event from track: Track with ID ${trackId} not found`,
			);
		}

		// Create a new track with the event removed
		const updatedTrack = track.removeEvent(eventId);

		// Get all current tracks as an array
		const currentTracks = this.tracksArray;

		// Create a new array with the updated track replacing the old one
		const newTracks = currentTracks.map((t) =>
			t.id === trackId ? updatedTrack : t,
		);

		// Return a new Project instance with the updated tracks
		return new Project(newTracks);
	}

	/**
	 * Gets all events from all tracks within a specific time range.
	 *
	 * @param startTicks - The start time in ticks
	 * @param endTicks - The end time in ticks
	 * @returns An array of events within the specified range from all tracks
	 */
	getEventsInRange(startTicks: number, endTicks: number): Event[] {
		if (startTicks < 0 || endTicks < startTicks) {
			throw new InvalidArgumentError(
				`Invalid time range: start=${startTicks}, end=${endTicks}`,
			);
		}

		// Get events from all tracks and flatten into a single array
		const events: Event[] = [];
		for (const track of this.tracksArray) {
			const trackEvents = track.getEventsInRange(startTicks, endTicks);
			events.push(...trackEvents);
		}

		// Sort events by time
		return events.sort((a, b) => a.time.value - b.time.value);
	}

	/**
	 * Gets all events from all tracks in this project.
	 *
	 * @returns An array of all events from all tracks, sorted by time
	 */
	getEvents(): Event[] {
		// Get events from all tracks and flatten into a single array
		const events: Event[] = [];
		for (const track of this.tracksArray) {
			events.push(...track.getEvents());
		}

		// Sort events by time
		return events.sort((a, b) => a.time.value - b.time.value);
	}
}
