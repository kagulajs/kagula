/**
 * Utility functions for generating unique identifiers.
 */

/**
 * Generates a unique identifier string.
 *
 * @returns A string containing a unique ID
 */
export function generateId(): string {
	return crypto.randomUUID();
}
