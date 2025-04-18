import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "../errors.js";
import { Pitch } from "../values/pitch.js";
import { Ticks } from "../values/time.js";
import { Velocity } from "../values/velocity.js";
import { Note } from "./note.js";

describe("Note", () => {
	describe("constructor", () => {
		it("should create an instance with valid parameters", () => {
			const id = "test-id-123";
			const time = new Ticks(480);
			const pitch = new Pitch(60);
			const velocity = new Velocity(100);
			const duration = new Ticks(240);

			const note = new Note(id, time, pitch, velocity, duration);

			expect(note.id).toBe(id);
			expect(note.time).toBe(time);
			expect(note.pitch).toBe(pitch);
			expect(note.velocity).toBe(velocity);
			expect(note.duration).toBe(duration);
		});

		it("should throw an InvalidArgumentError when given a non-Pitch value", () => {
			const id = "test-id-123";
			const time = new Ticks(480);
			const pitch = 60 as unknown as Pitch;
			const velocity = new Velocity(100);
			const duration = new Ticks(240);

			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				InvalidArgumentError,
			);
			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				"Note pitch must be a Pitch instance",
			);
		});

		it("should throw an InvalidArgumentError when given a non-Velocity value", () => {
			const id = "test-id-123";
			const time = new Ticks(480);
			const pitch = new Pitch(60);
			const velocity = 100 as unknown as Velocity;
			const duration = new Ticks(240);

			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				InvalidArgumentError,
			);
			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				"Note velocity must be a Velocity instance",
			);
		});

		it("should throw an InvalidArgumentError when given a non-Ticks duration", () => {
			const id = "test-id-123";
			const time = new Ticks(480);
			const pitch = new Pitch(60);
			const velocity = new Velocity(100);
			const duration = 240 as unknown as Ticks;

			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				InvalidArgumentError,
			);
			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				"Note duration must be a Ticks instance",
			);
		});

		it("should throw an InvalidArgumentError when given a non-positive duration", () => {
			const id = "test-id-123";
			const time = new Ticks(480);
			const pitch = new Pitch(60);
			const velocity = new Velocity(100);
			const duration = new Ticks(0);

			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				InvalidArgumentError,
			);
			expect(() => new Note(id, time, pitch, velocity, duration)).toThrow(
				"Note duration must be positive",
			);
		});
	});

	describe("create", () => {
		it("should create an instance with valid parameters and auto-generated ID", () => {
			const time = new Ticks(480);
			const pitch = new Pitch(60);
			const velocity = new Velocity(100);
			const duration = new Ticks(240);

			const note = Note.create(time, pitch, velocity, duration);

			expect(note.id).toBeDefined();
			expect(typeof note.id).toBe("string");
			expect(note.id.length).toBeGreaterThan(0);
			expect(note.time).toBe(time);
			expect(note.pitch).toBe(pitch);
			expect(note.velocity).toBe(velocity);
			expect(note.duration).toBe(duration);
		});
	});
});
