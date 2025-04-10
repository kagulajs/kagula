import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "./errors.js";
import { Note } from "./events/note.js";
import { Track } from "./track.js";
import { Pitch } from "./values/pitch.js";
import { Ticks } from "./values/time.js";
import { Velocity } from "./values/velocity.js";

describe("Track", () => {
	// Helper function to create a note event
	const createNote = (time: number, duration = 240) => {
		return new Note(
			new Ticks(time),
			new Pitch(60),
			new Velocity(100),
			new Ticks(duration),
		);
	};

	describe("constructor", () => {
		it("creates an empty track when no events are provided", () => {
			const track = new Track();
			expect(track.getEvents()).toEqual([]);
		});

		it("creates a track with the provided events", () => {
			const note1 = createNote(480);
			const note2 = createNote(960);
			const track = new Track([note1, note2]);

			expect(track.getEvents().length).toBe(2);
			expect(track.getEvents()[0]).toBe(note1);
			expect(track.getEvents()[1]).toBe(note2);
		});

		it("sorts events by time", () => {
			const note1 = createNote(960);
			const note2 = createNote(480);
			const track = new Track([note1, note2]);

			expect(track.getEvents().length).toBe(2);
			expect(track.getEvents()[0]).toBe(note2); // note2 has earlier time
			expect(track.getEvents()[1]).toBe(note1);
		});

		it("throws an error if any provided event is not an Event instance", () => {
			expect(() => {
				new Track([createNote(480), "not an event" as unknown as Note]);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("addEvent", () => {
		it("adds an event to the track", () => {
			const track = new Track();
			const note = createNote(480);
			const updatedTrack = track.addEvent(note);

			// Original track should be unchanged
			expect(track.getEvents().length).toBe(0);

			// New track should have the event
			expect(updatedTrack.getEvents().length).toBe(1);
			expect(updatedTrack.getEvents()[0]).toBe(note);
		});

		it("maintains event order when adding events", () => {
			const note1 = createNote(960);
			const track = new Track([note1]);

			const note2 = createNote(480);
			const updatedTrack = track.addEvent(note2);

			expect(updatedTrack.getEvents().length).toBe(2);
			expect(updatedTrack.getEvents()[0]).toBe(note2); // note2 has earlier time
			expect(updatedTrack.getEvents()[1]).toBe(note1);
		});

		it("throws an error if the provided event is not an Event instance", () => {
			const track = new Track();
			expect(() => {
				track.addEvent("not an event" as unknown as Note);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("removeEvent", () => {
		it("removes an event from the track", () => {
			const note1 = createNote(480);
			const note2 = createNote(960);
			const track = new Track([note1, note2]);

			const updatedTrack = track.removeEvent(note1);

			// Original track should be unchanged
			expect(track.getEvents().length).toBe(2);

			// New track should have one event removed
			expect(updatedTrack.getEvents().length).toBe(1);
			expect(updatedTrack.getEvents()[0]).toBe(note2);
		});

		it("returns a new track with the same events if the event to remove is not found", () => {
			const note1 = createNote(480);
			const track = new Track([note1]);

			const noteNotInTrack = createNote(960);
			const updatedTrack = track.removeEvent(noteNotInTrack);

			expect(updatedTrack.getEvents().length).toBe(1);
			expect(updatedTrack.getEvents()[0]).toBe(note1);
		});
	});

	describe("getEventsInRange", () => {
		it("returns events within the specified time range", () => {
			const note1 = createNote(480);
			const note2 = createNote(960);
			const note3 = createNote(1440);
			const track = new Track([note1, note2, note3]);

			const eventsInRange = track.getEventsInRange(500, 1000);

			expect(eventsInRange.length).toBe(1);
			expect(eventsInRange[0]).toBe(note2);
		});

		it("includes events at the range boundaries", () => {
			const note1 = createNote(480);
			const note2 = createNote(960);
			const track = new Track([note1, note2]);

			const eventsInRange = track.getEventsInRange(480, 960);

			expect(eventsInRange.length).toBe(2);
			expect(eventsInRange[0]).toBe(note1);
			expect(eventsInRange[1]).toBe(note2);
		});

		it("returns an empty array if no events are in the range", () => {
			const note1 = createNote(480);
			const note2 = createNote(960);
			const track = new Track([note1, note2]);

			const eventsInRange = track.getEventsInRange(1000, 2000);

			expect(eventsInRange.length).toBe(0);
		});

		it("throws an error if the range is invalid", () => {
			const track = new Track([createNote(480)]);

			expect(() => {
				track.getEventsInRange(-100, 500);
			}).toThrow(InvalidArgumentError);

			expect(() => {
				track.getEventsInRange(500, 100);
			}).toThrow(InvalidArgumentError);
		});
	});

	describe("getEvents", () => {
		it("returns all events in the track", () => {
			const note1 = createNote(480);
			const note2 = createNote(960);
			const track = new Track([note1, note2]);

			const events = track.getEvents();

			expect(events.length).toBe(2);
			expect(events[0]).toBe(note1);
			expect(events[1]).toBe(note2);
		});

		it("returns an empty array for a track with no events", () => {
			const track = new Track();

			const events = track.getEvents();

			expect(events).toEqual([]);
		});
	});
});
