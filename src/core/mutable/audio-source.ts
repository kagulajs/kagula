/**
 * Interface for an audio source that can be used in audio clips.
 *
 * AudioSource represents a reference to an audio file or buffer that can be
 * used in audio clips.
 */
export interface AudioSource {
	/**
	 * The file path of the audio source.
	 */
	filePath: string;

	// Additional metadata properties can be added here
}
