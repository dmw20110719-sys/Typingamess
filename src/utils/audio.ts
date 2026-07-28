/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Sound Effects Synthesizer for Korea Train Typing
let audioCtx: AudioContext | null = null;
let soundVolume: number = Number(localStorage.getItem("train_sound_volume") ?? 0.5);
let soundEnabled: boolean = localStorage.getItem("train_sound_enabled") !== "false";

export function setSoundVolume(volume: number) {
  soundVolume = Math.max(0, Math.min(1, volume));
  localStorage.setItem("train_sound_volume", String(soundVolume));
}

export function getSoundVolume(): number {
  return soundVolume;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  localStorage.setItem("train_sound_enabled", String(soundEnabled));
}

export function getSoundEnabled(): boolean {
  return soundEnabled;
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playTypingSound() {
  if (!soundEnabled || soundVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Slightly randomize pitch for typing variance
    osc.frequency.setValueAtTime(450 + Math.random() * 200, now);
    
    gain.gain.setValueAtTime(0.08 * soundVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
}

export function playErrorSound() {
  if (!soundEnabled || soundVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    
    gain.gain.setValueAtTime(0.2 * soundVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
}

export function playSuccessSound() {
  if (!soundEnabled || soundVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // First tone (E5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.1 * soundVolume, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // Second tone (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.setValueAtTime(880, now + 0.08);
    gain2.gain.setValueAtTime(0.1 * soundVolume, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.25);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
}

export function playCompleteSound() {
  if (!soundEnabled || soundVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.12 * soundVolume, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
}

export function initAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  } catch (e) {
    console.warn("initAudio failed:", e);
  }
}

export function playTicketTearSound() {
  if (!soundEnabled || soundVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // White noise burst for paper tear effect
    const bufferSize = Math.floor(ctx.sampleRate * 0.15);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 0.14);
    filter.Q.value = 2.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25 * soundVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);

    // Chime sweep on tear
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(650, now + 0.03);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.14);
    oscGain.gain.setValueAtTime(0.08 * soundVolume, now + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now + 0.03);
    osc.stop(now + 0.18);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
}
