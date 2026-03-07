/**
 * useImageSettings — localStorage-backed store for all adjustable site images.
 * Consumers (AboutPage, Layout) read from this; the Admin Image Editor writes to it.
 * Changes are broadcast via a CustomEvent so all consumers update instantly.
 */

export type FitMode = "cover" | "contain" | "fill";

export interface ImageConfig {
  /** objectPosition X percent (0–100) */
  posX: number;
  /** objectPosition Y percent (0–100) */
  posY: number;
  /** scale transform (0.5–2.0) */
  scale: number;
  /** transform-origin Y anchor ("top" | "center" | "bottom") */
  originY: "top" | "center" | "bottom";
  /** container height in px */
  containerHeight: number;
  /** object-fit mode */
  fit: FitMode;
}

export type ImageKey = "mel" | "shane" | "logo";

export const IMAGE_DEFAULTS: Record<ImageKey, ImageConfig> = {
  mel: {
    // Source: 800x1000px (tight close-up portrait, face fills most of frame)
    // Container: ~540px wide x 500px tall
    // CSS cover scale = max(540/800, 500/1000) = max(0.675, 0.5) = 0.675
    // Rendered: 540x675px. Overflow Y = 675-500 = 175px.
    // posY=2%: crop starts at 2/100*175=3.5px rendered = 5px natural
    //   shows natural 5px–746px (top of hair through upper chest). No scale transform.
    posX: 50,
    posY: 2,
    scale: 1.0,
    originY: "top",
    containerHeight: 500,
    fit: "cover",
  },
  shane: {
    // Source: 832x1248px (proper head+shoulders portrait)
    // Container: ~540px wide x 500px tall
    // CSS cover scale = max(540/832, 500/1248) = max(0.6490, 0.4006) = 0.649
    // Rendered: 540x810px. Overflow Y = 810-500 = 310px.
    // posY=8%: crop starts at 8/100*310=24.8px rendered = 38px natural
    //   shows natural 38px–808px (top of hair through upper chest). No scale transform.
    posX: 50,
    posY: 8,
    scale: 1.0,
    originY: "top",
    containerHeight: 500,
    fit: "cover",
  },
  logo: {
    posX: 50,
    posY: 50,
    scale: 1.0,
    originY: "center",
    containerHeight: 64,
    fit: "contain",
  },
};

const STORAGE_KEY = "cybin-image-settings";
// Bump this version whenever defaults change — clears stale localStorage cache
const SETTINGS_VERSION = "v4";
const VERSION_KEY = "cybin-image-settings-version";
const EVENT_NAME = "cybin-image-settings-changed";

function loadSettings(): Record<ImageKey, ImageConfig> {
  try {
    // If stored version doesn't match current, wipe stale settings and use fresh defaults
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== SETTINGS_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, SETTINGS_VERSION);
      return { ...IMAGE_DEFAULTS };
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with defaults so new keys always have values
      const merged: Record<ImageKey, ImageConfig> = {
        mel: { ...IMAGE_DEFAULTS.mel },
        shane: { ...IMAGE_DEFAULTS.shane },
        logo: { ...IMAGE_DEFAULTS.logo },
      };
      for (const k of Object.keys(merged) as ImageKey[]) {
        if (parsed[k]) {
          merged[k] = { ...merged[k], ...parsed[k] };
        }
      }
      return merged;
    }
  } catch {
    // ignore
  }
  return {
    mel: { ...IMAGE_DEFAULTS.mel },
    shane: { ...IMAGE_DEFAULTS.shane },
    logo: { ...IMAGE_DEFAULTS.logo },
  };
}

export function saveSettings(settings: Record<ImageKey, ImageConfig>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  localStorage.setItem(VERSION_KEY, SETTINGS_VERSION);
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function resetSettings(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(VERSION_KEY, SETTINGS_VERSION);
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function resetImageSettings(key: ImageKey): void {
  const current = loadSettings();
  current[key] = { ...IMAGE_DEFAULTS[key] };
  saveSettings(current);
}

export function getSettings(): Record<ImageKey, ImageConfig> {
  return loadSettings();
}

export function getImageStyle(key: ImageKey): React.CSSProperties {
  const cfg = loadSettings()[key];
  const transforms: string[] = [];
  const xShift = cfg.posX - 50;
  if (xShift !== 0) transforms.push(`translateX(${xShift * 0.5}%)`);
  if (cfg.scale !== 1.0) transforms.push(`scale(${cfg.scale})`);
  return {
    objectFit: cfg.fit,
    objectPosition: `center ${cfg.posY}%`,
    transform: transforms.length > 0 ? transforms.join(" ") : "none",
    transformOrigin: "center top",
  };
}

export { EVENT_NAME, loadSettings };
