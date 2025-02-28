/**
 * Main class for managing the 440Hz sine wave oscillator
 */
export class SineOscillator {
	private audioContext: AudioContext | null = null;
	private workletNode: AudioWorkletNode | null = null;
	private isInitialized = false;
	private isPlaying = false;

	/**
	 * Initialize the oscillator
	 */
	async initialize(): Promise<void> {
		if (this.isInitialized) return;

		try {
			this.audioContext = new AudioContext();

			const workletUrl = new URL(
				"./worklets/sine-oscillator-processor.js",
				import.meta.url,
			);
			await this.audioContext.audioWorklet.addModule(workletUrl);

			this.workletNode = new AudioWorkletNode(
				this.audioContext,
				"sine-oscillator-processor",
			);

			this.workletNode.connect(this.audioContext.destination);

			this.isInitialized = true;
		} catch (error) {
			console.error("Failed to initialize the oscillator:", error);
			throw error;
		}
	}

	/**
	 * Toggle playback state
	 */
	togglePlay(): boolean {
		if (!this.isInitialized || !this.workletNode) {
			throw new Error("Oscillator not initialized. Call initialize() first.");
		}

		this.isPlaying = !this.isPlaying;

		this.workletNode.port.postMessage({
			type: "toggle",
			data: { isPlaying: this.isPlaying },
		});

		if (this.audioContext && this.isPlaying) {
			this.audioContext.resume();
		}

		return this.isPlaying;
	}

	/**
	 * Check if the oscillator is currently playing
	 */
	getIsPlaying(): boolean {
		return this.isPlaying;
	}

	/**
	 * Release resources
	 */
	dispose(): void {
		if (this.workletNode) {
			this.workletNode.disconnect();
			this.workletNode = null;
		}

		if (this.audioContext) {
			this.audioContext.close();
			this.audioContext = null;
		}

		this.isInitialized = false;
		this.isPlaying = false;
	}
}

export default SineOscillator;
