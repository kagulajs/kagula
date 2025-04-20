import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "../errors.js";
import { Pitch } from "./pitch.js";

describe("Pitch", () => {
	describe("constructor", () => {
		it("should create an instance with a valid value", () => {
			const pitch = new Pitch(60);
			expect(pitch.value).toBe(60);
		});

		it("should create an instance with minimum value (0)", () => {
			const pitch = new Pitch(0);
			expect(pitch.value).toBe(0);
		});

		it("should create an instance with maximum value (127)", () => {
			const pitch = new Pitch(127);
			expect(pitch.value).toBe(127);
		});

		it("should throw an InvalidArgumentError when given a negative value", () => {
			expect(() => new Pitch(-1)).toThrow(InvalidArgumentError);
			expect(() => new Pitch(-1)).toThrow(
				"Pitch value must be between 0 and 127",
			);
		});

		it("should throw an InvalidArgumentError when given a value greater than 127", () => {
			expect(() => new Pitch(128)).toThrow(InvalidArgumentError);
			expect(() => new Pitch(128)).toThrow(
				"Pitch value must be between 0 and 127",
			);
		});

		it("should throw an InvalidArgumentError when given a non-integer value", () => {
			expect(() => new Pitch(60.5)).toThrow(InvalidArgumentError);
			expect(() => new Pitch(60.5)).toThrow("Pitch value must be an integer");
		});
	});
});
