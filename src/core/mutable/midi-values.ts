/**
 * Represents a MIDI pitch value.
 */
export interface MidiPitch {
	/**
	 * The MIDI pitch value (0-127).
	 */
	readonly value: number;
}

/**
 * Represents a MIDI velocity value.
 */
export interface MidiVelocity {
	/**
	 * The MIDI velocity value (0-127).
	 */
	readonly value: number;
}
