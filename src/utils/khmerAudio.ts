/**
 * Audio playback engine for authentic native Khmer recordings
 * Plays real recorded human native Khmer speaker audio files
 */

let activeAudio: HTMLAudioElement | null = null;

/**
 * Plays a real native human Khmer speaker MP3 audio file
 * @param audioUrl URL path to the native MP3 file (e.g. /assets/audio/khmer/mod1_0.mp3)
 * @param speed Playback speed rate (0.75x or 1.0x)
 * @param onStart Callback when playback begins
 * @param onEnd Callback when playback completes
 */
export function playNativeKhmerAudio(
  audioUrl: string,
  speed = 1.0,
  onStart?: () => void,
  onEnd?: () => void
): HTMLAudioElement {
  // Stop any currently playing audio
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) {
      // Ignore
    }
    activeAudio = null;
  }

  const audio = new Audio(audioUrl);
  activeAudio = audio;

  audio.playbackRate = speed;

  audio.onplay = () => {
    if (onStart) onStart();
  };

  audio.onended = () => {
    if (activeAudio === audio) activeAudio = null;
    if (onEnd) onEnd();
  };

  audio.onerror = () => {
    if (activeAudio === audio) activeAudio = null;
    if (onEnd) onEnd();
  };

  audio.play().catch((err) => {
    console.warn('Playback gesture required or interrupted:', err);
    if (onEnd) onEnd();
  });

  return audio;
}

export function stopNativeAudio() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) {
      // Ignore
    }
    activeAudio = null;
  }
}
