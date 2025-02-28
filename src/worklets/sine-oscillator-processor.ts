/**
 * A simple Audio Worklet Processor that generates a fixed 440Hz sine wave
 */
class SineOscillatorProcessor extends AudioWorkletProcessor {
	// Current phase of the oscillator
	private phase = 0;
	// Flag to control sound generation
	private isPlaying = false;
	// Fixed frequency (440Hz = A4 note)
	private readonly frequency = 440;

	constructor() {
		super();
		this.port.onmessage = (event: MessageEvent) => {
			const { type } = event.data;

			if (type === "toggle") {
				this.isPlaying = event.data.data.isPlaying;
			}
		};
	}

	/**
	 * Process audio data by generating a 440Hz sine wave
	 * @inheritdoc
	 */
	override process(
		_inputs: Float32Array[][],
		outputs: Float32Array[][],
		_parameters: Record<string, Float32Array>,
	): boolean {
		const output = outputs[0];
		if (!output) {
			return true;
		}

		const channelCount = output.length;

		for (let channel = 0; channel < channelCount; channel++) {
			const outputChannel = output[channel];
			if (!outputChannel) {
				continue;
			}

			for (let i = 0; i < outputChannel.length; i++) {
				if (this.isPlaying) {
					// Generate sine wave (fixed at 440Hz)
					outputChannel[i] = Math.sin(2 * Math.PI * this.phase);

					// Update phase
					this.phase += this.frequency / sampleRate;

					// Keep phase between 0 and 1
					if (this.phase > 1) {
						this.phase -= Math.floor(this.phase);
					}
				} else {
					// Silent when not playing
					outputChannel[i] = 0;
				}
			}
		}

		return true;
	}
}

registerProcessor("sine-oscillator-processor", SineOscillatorProcessor);

export {};
