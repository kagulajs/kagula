import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "../errors.js";
import { Seconds, Ticks } from "./time.js";

describe("Seconds", () => {
	describe("constructor", () => {
		it("should create an instance with a valid value", () => {
			const seconds = new Seconds(10.5);
			expect(seconds.value).toBe(10.5);
		});

		it("should create an instance with zero", () => {
			const seconds = new Seconds(0);
			expect(seconds.value).toBe(0);
		});

		it("should throw an InvalidArgumentError when given a negative value", () => {
			expect(() => new Seconds(-1)).toThrow(InvalidArgumentError);
			expect(() => new Seconds(-1)).toThrow("Seconds value cannot be negative");
		});
	});
});

describe("Ticks", () => {
	describe("constructor", () => {
		it("should create an instance with a valid value", () => {
			const ticks = new Ticks(42);
			expect(ticks.value).toBe(42);
		});

		it("should create an instance with zero", () => {
			const ticks = new Ticks(0);
			expect(ticks.value).toBe(0);
		});

		it("should throw an InvalidArgumentError when given a negative value", () => {
			expect(() => new Ticks(-1)).toThrow(InvalidArgumentError);
			expect(() => new Ticks(-1)).toThrow("Ticks value cannot be negative");
		});

		it("should throw an InvalidArgumentError when given a non-integer value", () => {
			expect(() => new Ticks(3.5)).toThrow(InvalidArgumentError);
			expect(() => new Ticks(3.5)).toThrow("Ticks value must be an integer");
		});
	});
});
