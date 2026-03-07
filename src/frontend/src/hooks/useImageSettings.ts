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
    posX: 50,
    posY: 47,
    scale: 1.0,
    originY: "top",
    containerHeight: 540,
    fit: "cover",
  },
  shane: {
    posX: 50,
    posY: 42,
    scale: 1.0,
    originY: "top",
    containerHeight: 540,
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
const EVENT_NAME = "cybin-image-settings-changed";

function loadSettings(): Record<ImageKey, ImageConfig> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with defaults so new keys always have values
      const merged: Record<ImageKey, ImageConfig> = { ...IMAGE_DEFAULTS };
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
  return { ...IMAGE_DEFAULTS };
}

export function saveSettings(settings: Record<ImageKey, ImageConfig>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function resetSettings(): void {
  localStorage.removeItem(STORAGE_KEY);
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
  return {
    objectFit: cfg.fit,
    objectPosition: `${cfg.posX}% ${cfg.posY}%`,
    transform: cfg.scale !== 1.0 ? `scale(${cfg.scale})` : undefined,
    transformOrigin: `center ${cfg.originY}`,
  };
}

export { EVENT_NAME, loadSettings };
