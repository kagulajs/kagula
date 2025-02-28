/**
 * Extended type definitions for the Audio Worklet API
 * Based on the W3C Web Audio API specification
 * @see https://webaudio.github.io/web-audio-api/#audioworklet
 */

declare global {
	/**
	 * AudioWorkletProcessor is the base class for audio processing code that runs
	 * in the AudioWorklet. This constructor is called when the processor is created.
	 */
	abstract class AudioWorkletProcessor {
		/**
		 * A MessagePort used to communicate between the processor and the AudioWorkletNode
		 */
		readonly port: MessagePort;

		constructor();

		/**
		 * This method is called for each block of audio to be processed
		 * @param inputs Array of inputs, each input is an array of channels
		 * @param outputs Array of outputs, each output is an array of channels
		 * @param parameters Object containing automation data for parameters
		 * @returns Boolean indicating whether the processor should continue processing
		 */
		abstract process(
			inputs: Float32Array[][],
			outputs: Float32Array[][],
			parameters: Record<string, Float32Array>,
		): boolean;
	}

	/**
	 * Constructor interface for AudioWorkletProcessor
	 */
	interface AudioWorkletProcessorConstructor {
		new (): AudioWorkletProcessor;

		/**
		 * Optional static property that describes the parameters used by this processor
		 */
		parameterDescriptors?: AudioParamDescriptor[];
	}

	/**
	 * Registers a class as an AudioWorkletProcessor
	 * @param name The name of the processor, used when creating AudioWorkletNode
	 * @param processorCtor The constructor of the processor
	 */
	function registerProcessor(
		name: string,
		processorCtor: AudioWorkletProcessorConstructor,
	): void;

	/**
	 * The index of the current audio frame being processed
	 */
	const currentFrame: number;

	/**
	 * The current time in seconds of the audio context
	 */
	const currentTime: number;

	/**
	 * The sample rate of the audio context
	 */
	const sampleRate: number;

	/**
	 * Descriptor for an audio parameter used in an AudioWorkletProcessor
	 */
	interface AudioParamDescriptor {
		/**
		 * The name of the parameter
		 */
		name: string;

		/**
		 * The default value for the parameter
		 */
		defaultValue?: number;

		/**
		 * The minimum value for the parameter
		 */
		minValue?: number;

		/**
		 * The maximum value for the parameter
		 */
		maxValue?: number;

		/**
		 * The rate at which the parameter is processed
		 * "a-rate" - Updated for each sample
		 * "k-rate" - Updated for each processing block
		 */
		automationRate?: "a-rate" | "k-rate";
	}
}

export {};
