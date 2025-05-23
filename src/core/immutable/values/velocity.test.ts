import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "../errors.js";
import { Velocity } from "./velocity.js";

describe("Velocity", () => {
	describe("constructor", () => {
		it("should create an instance with a valid value", () => {
			const velocity = new Velocity(100);
			expect(velocity.value).toBe(100);
		});

		it("should create an instance with minimum value (0)", () => {
			const velocity = new Velocity(0);
			expect(velocity.value).toBe(0);
		});

		it("should create an instance with maximum value (127)", () => {
			const velocity = new Velocity(127);
			expect(velocity.value).toBe(127);
		});

		it("should throw an InvalidArgumentError when given a negative value", () => {
			expect(() => new Velocity(-1)).toThrow(InvalidArgumentError);
			expect(() => new Velocity(-1)).toThrow(
				"Velocity value must be between 0 and 127",
			);
		});

		it("should throw an InvalidArgumentError when given a value greater than 127", () => {
			expect(() => new Velocity(128)).toThrow(InvalidArgumentError);
			expect(() => new Velocity(128)).toThrow(
				"Velocity value must be between 0 and 127",
			);
		});

		it("should throw an InvalidArgumentError when given a non-integer value", () => {
			expect(() => new Velocity(100.5)).toThrow(InvalidArgumentError);
			expect(() => new Velocity(100.5)).toThrow(
				"Velocity value must be an integer",
			);
		});
	});
});
