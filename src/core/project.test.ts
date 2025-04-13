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
	const createTrack = (noteTimes: number[] = [], name = "") => {
		const notes = noteTimes.map((time) => createNote(time));
		return Track.create({ name }, notes);
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
			const [updatedProject, track] = project.addTrack({ name: "Test Track" });

			// Original project should be unchanged
			expect(project.getTracks().length).toBe(0);

			// New project should have the track
			expect(updatedProject.getTracks().length).toBe(1);
			expect(updatedProject.getTracks()[0]).toBe(track);
			expect(updatedProject.getTrackCount()).toBe(1);
			expect(track.name).toBe("Test Track");
		});

		it("creates a track with default properties when no props are provided", () => {
			const project = new Project();
			const [updatedProject, track] = project.addTrack();

			expect(updatedProject.getTracks().length).toBe(1);
			expect(track.name).toBe("");
		});
	});

	describe("removeTrack", () => {
		it("removes a track from the project", () => {
			const track1 = createTrack([480]);
			const track2 = createTrack([960]);
			const project = new Project([track1, track2]);

			const updatedProject = project.removeTrack(track1.id);

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

			// Use a non-existent ID
			const nonExistentId = "non-existent-id";
			const updatedProject = project.removeTrack(nonExistentId);

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

	describe("accessing tracks by index", () => {
		it("can access tracks by array index using getTracks()", () => {
			const track1 = createTrack([480]);
			const track2 = createTrack([960]);
			const project = new Project([track1, track2]);

			expect(project.getTracks()[0]).toBe(track1);
			expect(project.getTracks()[1]).toBe(track2);
		});

		it("returns undefined when accessing out of bounds indices", () => {
			const track = createTrack([480]);
			const project = new Project([track]);

			expect(project.getTracks()[-1]).toBeUndefined();
			expect(project.getTracks()[1]).toBeUndefined();
		});
	});

	describe("getTrackCount", () => {
		it("returns the number of tracks in the project", () => {
			const project = new Project();
			expect(project.getTrackCount()).toBe(0);

			const [updatedProject] = project.addTrack({ name: "Track 1" });
			expect(updatedProject.getTrackCount()).toBe(1);

			const [finalProject] = updatedProject.addTrack({ name: "Track 2" });
			expect(finalProject.getTrackCount()).toBe(2);
		});
	});

	describe("addEvent", () => {
		it("adds an event to a track in the project", () => {
			const track = createTrack([]);
			const project = new Project([track]);
			const note = createNote(480);
			const updatedProject = project.addEvent(track.id, note);

			// Original project should be unchanged
			expect(project.getTrack(track.id)?.getEvents().length).toBe(0);

			// New project should have the track with the event
			const updatedTrack = updatedProject.getTrack(track.id);
			expect(updatedTrack?.getEvents().length).toBe(1);
			expect(updatedTrack?.getEvents()[0]).toBe(note);
		});

		it("throws an error if the track is not found", () => {
			const project = new Project();
			const note = createNote(480);

			expect(() => {
				project.addEvent("non-existent-track-id", note);
			}).toThrow(InvalidArgumentError);
		});

		it("throws an error if the provided event is not an Event instance", () => {
			const track = createTrack([]);
			const project = new Project([track]);

			expect(() => {
				project.addEvent(track.id, "not an event" as unknown as Note);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("removeEvent", () => {
		it("removes an event from a track in the project", () => {
			const note = createNote(480);
			const track = Track.create(undefined, [note]);
			const project = new Project([track]);

			const updatedProject = project.removeEvent(track.id, note.id);

			// Original project should be unchanged
			expect(project.getTrack(track.id)?.getEvents().length).toBe(1);

			// New project should have the track with the event removed
			const updatedTrack = updatedProject.getTrack(track.id);
			expect(updatedTrack?.getEvents().length).toBe(0);
		});

		it("throws an error if the track is not found", () => {
			const note = createNote(480);
			const track = Track.create(undefined, [note]);
			const project = new Project([track]);

			expect(() => {
				project.removeEvent("non-existent-track-id", note.id);
			}).toThrow(InvalidArgumentError);
		});

		it("returns a new project with the same tracks if the event to remove is not found", () => {
			const note = createNote(480);
			const track = Track.create(undefined, [note]);
			const project = new Project([track]);

			// Use a non-existent ID
			const nonExistentId = "non-existent-id";
			const updatedProject = project.removeEvent(track.id, nonExistentId);

			// Track should still have the original event
			const updatedTrack = updatedProject.getTrack(track.id);
			expect(updatedTrack?.getEvents().length).toBe(1);
			expect(updatedTrack?.getEvents()[0]).toBe(note);
		});
	});

	describe("getEventsInRange", () => {
		it("returns all events within the specified time range from all tracks", () => {
			const note1 = createNote(100);
			const note2 = createNote(200);
			const note3 = createNote(300);
			const note4 = createNote(400);
			const note5 = createNote(500);

			const track1 = Track.create(undefined, [note1, note3, note5]);
			const track2 = Track.create(undefined, [note2, note4]);
			const project = new Project([track1, track2]);

			// Get events in range 150-350
			const eventsInRange = project.getEventsInRange(150, 350);

			expect(eventsInRange.length).toBe(2);
			expect(eventsInRange).toContain(note2);
			expect(eventsInRange).toContain(note3);

			// Events should be sorted by time
			expect(eventsInRange[0]).toBe(note2);
			expect(eventsInRange[1]).toBe(note3);
		});

		it("returns an empty array if no events are within the specified range", () => {
			const note1 = createNote(100);
			const note2 = createNote(200);
			const track = Track.create(undefined, [note1, note2]);
			const project = new Project([track]);

			const eventsInRange = project.getEventsInRange(300, 400);

			expect(eventsInRange).toEqual([]);
		});

		it("throws an error if the time range is invalid", () => {
			const project = new Project();

			// Negative start time
			expect(() => {
				project.getEventsInRange(-100, 200);
			}).toThrow(InvalidArgumentError);

			// End time before start time
			expect(() => {
				project.getEventsInRange(200, 100);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("getEvents", () => {
		it("returns all events from all tracks sorted by time", () => {
			const note1 = createNote(300);
			const note2 = createNote(100);
			const note3 = createNote(500);
			const note4 = createNote(200);
			const note5 = createNote(400);

			const track1 = Track.create(undefined, [note1, note3, note5]);
			const track2 = Track.create(undefined, [note2, note4]);
			const project = new Project([track1, track2]);

			const allEvents = project.getEvents();

			expect(allEvents.length).toBe(5);

			// Events should be sorted by time
			expect(allEvents[0]).toBe(note2); // 100
			expect(allEvents[1]).toBe(note4); // 200
			expect(allEvents[2]).toBe(note1); // 300
			expect(allEvents[3]).toBe(note5); // 400
			expect(allEvents[4]).toBe(note3); // 500
		});

		it("returns an empty array for a project with no events", () => {
			const track = Track.create();
			const project = new Project([track]);

			const allEvents = project.getEvents();

			expect(allEvents).toEqual([]);
		});

		it("returns an empty array for a project with no tracks", () => {
			const project = new Project();

			const allEvents = project.getEvents();

			expect(allEvents).toEqual([]);
		});
	});
});
