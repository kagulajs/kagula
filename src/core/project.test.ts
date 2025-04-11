import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "./errors.js";
import { Note } from "./events/note.js";
import { Project } from "./project.js";
import { Track } from "./track.js";
import { Pitch } from "./values/pitch.js";
import { Ticks } from "./values/time.js";
import { Velocity } from "./values/velocity.js";

describe("Project", () => {
	// Helper function to create a note event
	const createNote = (time: number, duration = 240) => {
		return Note.create(
			new Ticks(time),
			new Pitch(60),
			new Velocity(100),
			new Ticks(duration),
		);
	};

	// Helper function to create a track with notes
	const createTrack = (noteTimes: number[] = []) => {
		const notes = noteTimes.map((time) => createNote(time));
		return new Track(notes);
	};

	describe("constructor", () => {
		it("creates an empty project when no tracks are provided", () => {
			const project = new Project();
			expect(project.getTracks()).toEqual([]);
			expect(project.getTrackCount()).toBe(0);
		});

		it("creates a project with the provided tracks", () => {
			const track1 = createTrack([480]);
			const track2 = createTrack([960]);
			const project = new Project([track1, track2]);

			expect(project.getTracks().length).toBe(2);
			expect(project.getTracks()[0]).toBe(track1);
			expect(project.getTracks()[1]).toBe(track2);
			expect(project.getTrackCount()).toBe(2);
		});

		it("throws an error if any provided track is not a Track instance", () => {
			expect(() => {
				new Project([createTrack([480]), "not a track" as unknown as Track]);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("addTrack", () => {
		it("adds a track to the project", () => {
			const project = new Project();
			const track = createTrack([480]);
			const updatedProject = project.addTrack(track);

			// Original project should be unchanged
			expect(project.getTracks().length).toBe(0);

			// New project should have the track
			expect(updatedProject.getTracks().length).toBe(1);
			expect(updatedProject.getTracks()[0]).toBe(track);
			expect(updatedProject.getTrackCount()).toBe(1);
		});

		it("throws an error if the provided track is not a Track instance", () => {
			const project = new Project();
			expect(() => {
				project.addTrack("not a track" as unknown as Track);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("removeTrack", () => {
		it("removes a track from the project", () => {
			const track1 = createTrack([480]);
			const track2 = createTrack([960]);
			const project = new Project([track1, track2]);

			const updatedProject = project.removeTrack(track1);

			// Original project should be unchanged
			expect(project.getTracks().length).toBe(2);

			// New project should have one track removed
			expect(updatedProject.getTracks().length).toBe(1);
			expect(updatedProject.getTracks()[0]).toBe(track2);
			expect(updatedProject.getTrackCount()).toBe(1);
		});

		it("returns a new project with the same tracks if the track to remove is not found", () => {
			const track1 = createTrack([480]);
			const project = new Project([track1]);

			const trackNotInProject = createTrack([960]);
			const updatedProject = project.removeTrack(trackNotInProject);

			expect(updatedProject.getTracks().length).toBe(1);
			expect(updatedProject.getTracks()[0]).toBe(track1);
			expect(updatedProject.getTrackCount()).toBe(1);
		});
	});

	describe("getTracks", () => {
		it("returns all tracks in the project", () => {
			const track1 = createTrack([480]);
			const track2 = createTrack([960]);
			const project = new Project([track1, track2]);

			const tracks = project.getTracks();

			expect(tracks.length).toBe(2);
			expect(tracks[0]).toBe(track1);
			expect(tracks[1]).toBe(track2);
		});

		it("returns an empty array for a project with no tracks", () => {
			const project = new Project();

			const tracks = project.getTracks();

			expect(tracks).toEqual([]);
		});
	});

	describe("getTrackAt", () => {
		it("returns the track at the specified index", () => {
			const track1 = createTrack([480]);
			const track2 = createTrack([960]);
			const project = new Project([track1, track2]);

			expect(project.getTrackAt(0)).toBe(track1);
			expect(project.getTrackAt(1)).toBe(track2);
		});

		it("returns undefined if the index is out of bounds", () => {
			const track = createTrack([480]);
			const project = new Project([track]);

			expect(project.getTrackAt(-1)).toBeUndefined();
			expect(project.getTrackAt(1)).toBeUndefined();
		});
	});

	describe("getTrackCount", () => {
		it("returns the number of tracks in the project", () => {
			const project = new Project();
			expect(project.getTrackCount()).toBe(0);

			const track = createTrack([480]);
			const updatedProject = project.addTrack(track);
			expect(updatedProject.getTrackCount()).toBe(1);

			const anotherTrack = createTrack([960]);
			const finalProject = updatedProject.addTrack(anotherTrack);
			expect(finalProject.getTrackCount()).toBe(2);
		});
	});
});
