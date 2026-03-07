/**
 * useLiveImageSettings — React hook that subscribes to image setting changes.
 * Used by AboutPage and Layout to get live-updating CSS styles from the admin editor.
 * Style is derived directly from reactive config state so slider changes
 * propagate to the live page instantly — no stale reads from localStorage.
 */
import { useEffect, useState } from "react";
import {
  EVENT_NAME,
  type ImageConfig,
  type ImageKey,
  getSettings,
} from "./useImageSettings";

function configToStyle(cfg: ImageConfig): React.CSSProperties {
  // Clean strategy: objectPosition handles vertical crop (Y) reliably with cover fit.
  // Scale is applied as a transform only when explicitly set by the admin editor,
  // using translateY to compensate for any crop shift caused by scaling.
  // No compounding transforms — each axis is independent.

  const transforms: string[] = [];

  // X shift: objectPosition X is ignored on portrait cover (no horizontal overflow).
  // Use translateX instead for horizontal adjustment.
  const xShift = cfg.posX - 50;
  if (xShift !== 0) transforms.push(`translateX(${xShift * 0.5}%)`);

  // Scale: zoom in/out around center of image
  if (cfg.scale !== 1.0) {
    // When scaling, objectPosition Y still controls the crop anchor.
    // We don't need extra compensation — browser handles this correctly.
    transforms.push(`scale(${cfg.scale})`);
  }

  return {
    objectFit: cfg.fit,
    objectPosition: `center ${cfg.posY}%`,
    transform: transforms.length > 0 ? transforms.join(" ") : "none",
    transformOrigin: "center top",
  };
}

export function useLiveImageSettings(key: ImageKey): {
  style: React.CSSProperties;
  config: ImageConfig;
} {
  const [config, setConfig] = useState<ImageConfig>(() => getSettings()[key]);

  useEffect(() => {
    // Re-sync on mount in case settings changed in another tab/window
    setConfig(getSettings()[key]);

    const handler = () => {
      setConfig(getSettings()[key]);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [key]);

  // Derive style from reactive config — guaranteed to update on every slider move
  return {
    style: configToStyle(config),
    config,
  };
}

export function useLiveImageStyle(key: ImageKey): React.CSSProperties {
  const [config, setConfig] = useState<ImageConfig>(() => getSettings()[key]);

  useEffect(() => {
    setConfig(getSettings()[key]);

    const handler = () => {
      setConfig(getSettings()[key]);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [key]);

  return configToStyle(config);
}
