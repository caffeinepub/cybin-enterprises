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
  return {
    objectFit: cfg.fit,
    objectPosition: `${cfg.posX}% ${cfg.posY}%`,
    transform: cfg.scale !== 1.0 ? `scale(${cfg.scale})` : undefined,
    transformOrigin: `center ${cfg.originY}`,
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
