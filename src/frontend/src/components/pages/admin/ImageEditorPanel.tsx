/**
 * ImageEditorPanel — full visual editor for every adjustable image on the site.
 * Lives inside the Admin Panel as a tab. All changes persist to localStorage
 * and broadcast to the live site instantly via CustomEvent.
 */
import {
  EVENT_NAME,
  type FitMode,
  IMAGE_DEFAULTS,
  type ImageConfig,
  type ImageKey,
  getSettings,
  resetImageSettings,
  saveSettings,
} from "@/hooks/useImageSettings";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Check,
  ClipboardCopy,
  Grid3x3,
  RefreshCw,
  RotateCcw,
  Save,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import logoPhoto from "/assets/cybin-logo.png";
import melPhoto from "/assets/mel-headshot.jpeg";
import shanePhoto from "/assets/uploads/IMG_2988-1.jpeg";

// ─── Image registry ────────────────────────────────────────────────────────────

interface ImageMeta {
  key: ImageKey;
  label: string;
  description: string;
  src: string;
  accentColor: string;
}

const IMAGES: ImageMeta[] = [
  {
    key: "mel",
    label: "Mel Kotchey",
    description: "About page — Co-Founder & CEO headshot",
    src: melPhoto,
    accentColor: "#00d4b8",
  },
  {
    key: "shane",
    label: "Shane Suehr",
    description: "About page — Co-Founder & COO headshot",
    src: shanePhoto,
    accentColor: "#a87ef5",
  },
  {
    key: "logo",
    label: "Cybin Logo",
    description: "Header & Footer logo",
    src: logoPhoto,
    accentColor: "#ffc832",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function round2(v: number) {
  return Math.round(v * 100) / 100;
}

function cfgToCss(cfg: ImageConfig): string {
  const lines: string[] = [
    `objectFit: "${cfg.fit}",`,
    `objectPosition: "${cfg.posX}% ${cfg.posY}%",`,
  ];
  if (cfg.scale !== 1.0) {
    lines.push(`transform: "scale(${cfg.scale})",`);
    lines.push(`transformOrigin: "center ${cfg.originY}",`);
  }
  return `{\n  ${lines.join("\n  ")}\n}`;
}

// ─── Slider ────────────────────────────────────────────────────────────────────

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  accentColor,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  accentColor: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-xs font-semibold"
          style={{ color: "rgba(232,237,248,0.6)" }}
        >
          {label}
        </span>
        <span
          className="text-xs font-bold tabular-nums"
          style={{ color: accentColor }}
        >
          {value}
          {unit}
        </span>
      </div>
      <div style={{ position: "relative", height: "20px" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: "100%",
            height: "4px",
            appearance: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
            borderRadius: "2px",
            outline: "none",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Single Image Editor ───────────────────────────────────────────────────────

function ImageEditor({
  meta,
  config,
  onChange,
}: {
  meta: ImageMeta;
  config: ImageConfig;
  onChange: (key: ImageKey, cfg: ImageConfig) => void;
}) {
  const [showGrid, setShowGrid] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const set = useCallback(
    (partial: Partial<ImageConfig>) => {
      onChange(meta.key, { ...config, ...partial });
    },
    [config, meta.key, onChange],
  );

  const handleCopyCss = () => {
    const css = cfgToCss(compareMode ? IMAGE_DEFAULTS[meta.key] : config);
    navigator.clipboard.writeText(css).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1800);
    });
  };

  const handleReset = () => {
    onChange(meta.key, { ...IMAGE_DEFAULTS[meta.key] });
    resetImageSettings(meta.key);
  };

  const displayCfg = compareMode ? IMAGE_DEFAULTS[meta.key] : config;

  // Is mobile portrait mode? Container is shorter
  const containerH =
    meta.key === "logo"
      ? Math.max(displayCfg.containerHeight, 64)
      : displayCfg.containerHeight;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${meta.accentColor}22`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{
          borderBottom: `1px solid ${meta.accentColor}18`,
          background: `${meta.accentColor}08`,
        }}
      >
        <div>
          <h3
            className="font-bold text-base"
            style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
          >
            {meta.label}
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(232,237,248,0.4)" }}
          >
            {meta.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Compare toggle */}
          <button
            type="button"
            onClick={() => setCompareMode(!compareMode)}
            title="Toggle compare: default vs current"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: compareMode
                ? `${meta.accentColor}20`
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${compareMode ? `${meta.accentColor}50` : "rgba(255,255,255,0.1)"}`,
              color: compareMode ? meta.accentColor : "rgba(232,237,248,0.5)",
            }}
          >
            <RotateCcw size={12} className="inline mr-1" />
            {compareMode ? "Default" : "Compare"}
          </button>
          {/* Grid overlay */}
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle rule-of-thirds grid"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: showGrid
                ? `${meta.accentColor}20`
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${showGrid ? `${meta.accentColor}50` : "rgba(255,255,255,0.1)"}`,
              color: showGrid ? meta.accentColor : "rgba(232,237,248,0.5)",
            }}
          >
            <Grid3x3 size={12} className="inline mr-1" />
            Grid
          </button>
          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset to defaults"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: "rgba(255,107,107,0.06)",
              border: "1px solid rgba(255,107,107,0.2)",
              color: "rgba(255,107,107,0.8)",
            }}
          >
            <RefreshCw size={12} className="inline mr-1" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Live Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "rgba(232,237,248,0.4)" }}
            >
              {compareMode ? "DEFAULT PREVIEW" : "LIVE PREVIEW"}
              {compareMode && (
                <span
                  className="ml-2 px-1.5 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: "rgba(255,200,50,0.12)",
                    color: "#ffc832",
                  }}
                >
                  compare mode
                </span>
              )}
            </span>
            <span
              className="text-xs tabular-nums"
              style={{ color: "rgba(232,237,248,0.3)" }}
            >
              {meta.key !== "logo" ? `${containerH}px tall` : `${containerH}px`}
            </span>
          </div>

          {/* Preview container */}
          <div
            ref={containerRef}
            style={{
              position: "relative",
              width: "100%",
              height: `${containerH}px`,
              overflow: "hidden",
              borderRadius: meta.key === "logo" ? "8px" : "12px",
              border: `1px solid ${meta.accentColor}30`,
              background: meta.key === "logo" ? "#0a0f1e" : "#080d1a",
            }}
          >
            {/* Actual image */}
            <img
              src={meta.src}
              alt={meta.label}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: displayCfg.fit,
                objectPosition: `${displayCfg.posX}% ${displayCfg.posY}%`,
                transform:
                  displayCfg.scale !== 1.0
                    ? `scale(${displayCfg.scale})`
                    : "none",
                transformOrigin: `center ${displayCfg.originY}`,
                transition: "object-position 0.1s ease, transform 0.1s ease",
                ...(meta.key === "logo"
                  ? { mixBlendMode: "screen" as const }
                  : {}),
              }}
            />

            {/* Grid overlay — rule of thirds + center cross */}
            {showGrid && (
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
                viewBox="0 0 300 300"
                preserveAspectRatio="none"
              >
                {/* Thirds lines */}
                <line
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="300"
                  stroke={meta.accentColor}
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
                <line
                  x1="200"
                  y1="0"
                  x2="200"
                  y2="300"
                  stroke={meta.accentColor}
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
                <line
                  x1="0"
                  y1="100"
                  x2="300"
                  y2="100"
                  stroke={meta.accentColor}
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
                <line
                  x1="0"
                  y1="200"
                  x2="300"
                  y2="200"
                  stroke={meta.accentColor}
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
                {/* Center cross */}
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="300"
                  stroke="#ffffff"
                  strokeWidth="0.4"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="300"
                  y2="150"
                  stroke="#ffffff"
                  strokeWidth="0.4"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />
                {/* Corner dots at intersection points */}
                <circle
                  cx="100"
                  cy="100"
                  r="2.5"
                  fill={meta.accentColor}
                  fillOpacity="0.8"
                />
                <circle
                  cx="200"
                  cy="100"
                  r="2.5"
                  fill={meta.accentColor}
                  fillOpacity="0.8"
                />
                <circle
                  cx="100"
                  cy="200"
                  r="2.5"
                  fill={meta.accentColor}
                  fillOpacity="0.8"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="2.5"
                  fill={meta.accentColor}
                  fillOpacity="0.8"
                />
                {/* Center dot */}
                <circle cx="150" cy="150" r="2" fill="#fff" fillOpacity="0.5" />
                {/* Crop line indicators — top and bottom */}
                <line
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="0"
                  stroke="#ff6b6b"
                  strokeWidth="1.5"
                  strokeOpacity="0.9"
                />
                <line
                  x1="0"
                  y1="300"
                  x2="300"
                  y2="300"
                  stroke="#ff6b6b"
                  strokeWidth="1.5"
                  strokeOpacity="0.9"
                />
                {/* Labels */}
                <text
                  x="4"
                  y="12"
                  fill="#ff6b6b"
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.9"
                >
                  TOP CROP
                </text>
                <text
                  x="4"
                  y="293"
                  fill="#ff6b6b"
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.9"
                >
                  BOTTOM CROP
                </text>
              </svg>
            )}

            {/* Edge rim-light overlay — visual match to live site */}
            {meta.key !== "logo" && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    meta.key === "mel"
                      ? "linear-gradient(to right, rgba(0,212,184,0.15) 0%, transparent 20%, transparent 80%, rgba(0,212,184,0.12) 100%)"
                      : "linear-gradient(to right, rgba(124,92,191,0.17) 0%, transparent 20%, transparent 80%, rgba(124,92,191,0.14) 100%)",
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                  zIndex: 2,
                }}
              />
            )}
          </div>

          {/* Crop line alignment helper */}
          {meta.key !== "logo" && (
            <div
              className="mt-3 flex items-center gap-3 text-xs"
              style={{ color: "rgba(232,237,248,0.4)" }}
            >
              <span style={{ color: "#ff6b6b" }}>▬</span> Red lines = crop
              boundaries
              <span style={{ color: meta.accentColor }}>●</span> Dots = thirds
              intersections
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-5">
          {/* Position */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              Position (Crop Point)
            </p>
            <div className="space-y-4">
              <Slider
                label="Horizontal (X)"
                value={round2(config.posX)}
                min={0}
                max={100}
                step={1}
                unit="%"
                accentColor={meta.accentColor}
                onChange={(v) => set({ posX: v })}
              />
              <Slider
                label="Vertical (Y) — pull down = show more top"
                value={round2(config.posY)}
                min={0}
                max={100}
                step={1}
                unit="%"
                accentColor={meta.accentColor}
                onChange={(v) => set({ posY: v })}
              />
            </div>
          </div>

          {/* Scale */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              Scale / Zoom
            </p>
            <Slider
              label="Scale"
              value={round2(config.scale)}
              min={0.3}
              max={2.0}
              step={0.01}
              accentColor={meta.accentColor}
              onChange={(v) => set({ scale: clamp(v, 0.3, 2.0) })}
            />

            {/* Scale anchor */}
            <div className="mt-4">
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "rgba(232,237,248,0.4)" }}
              >
                Scale anchor (transform-origin Y)
              </p>
              <div className="flex gap-2">
                {(["top", "center", "bottom"] as const).map((anchor) => (
                  <button
                    key={anchor}
                    type="button"
                    onClick={() => set({ originY: anchor })}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
                    style={{
                      backgroundColor:
                        config.originY === anchor
                          ? `${meta.accentColor}18`
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${config.originY === anchor ? `${meta.accentColor}50` : "rgba(255,255,255,0.08)"}`,
                      color:
                        config.originY === anchor
                          ? meta.accentColor
                          : "rgba(232,237,248,0.45)",
                    }}
                  >
                    {anchor === "top" && (
                      <AlignLeft size={10} className="inline mr-1" />
                    )}
                    {anchor === "center" && (
                      <AlignCenter size={10} className="inline mr-1" />
                    )}
                    {anchor === "bottom" && (
                      <AlignRight size={10} className="inline mr-1" />
                    )}
                    {anchor}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Container size */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              Container Height
            </p>
            <Slider
              label="Height"
              value={config.containerHeight}
              min={meta.key === "logo" ? 40 : 300}
              max={meta.key === "logo" ? 200 : 900}
              step={meta.key === "logo" ? 4 : 10}
              unit="px"
              accentColor={meta.accentColor}
              onChange={(v) => set({ containerHeight: v })}
            />
          </div>

          {/* Fit mode */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              Fit Mode
            </p>
            <div className="flex gap-2">
              {(["cover", "contain", "fill"] as FitMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => set({ fit: mode })}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
                  style={{
                    backgroundColor:
                      config.fit === mode
                        ? `${meta.accentColor}18`
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${config.fit === mode ? `${meta.accentColor}50` : "rgba(255,255,255,0.08)"}`,
                    color:
                      config.fit === mode
                        ? meta.accentColor
                        : "rgba(232,237,248,0.45)",
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p
              className="text-xs mt-2"
              style={{ color: "rgba(232,237,248,0.25)" }}
            >
              Cover = fill & crop (recommended) · Contain = letterbox · Fill =
              stretch
            </p>
          </div>

          {/* Copy CSS */}
          <button
            type="button"
            onClick={handleCopyCss}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              backgroundColor: showCopied
                ? "rgba(0,212,184,0.12)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${showCopied ? "rgba(0,212,184,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: showCopied ? "#00d4b8" : "rgba(232,237,248,0.45)",
            }}
          >
            {showCopied ? <Check size={12} /> : <ClipboardCopy size={12} />}
            {showCopied ? "Copied to clipboard!" : "Copy CSS style object"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Panel ────────────────────────────────────────────────────────────────

export default function ImageEditorPanel() {
  const [settings, setSettings] = useState<Record<ImageKey, ImageConfig>>(() =>
    getSettings(),
  );
  const [saved, setSaved] = useState(false);
  const [activeKey, setActiveKey] = useState<ImageKey>("mel");

  // Listen for external changes
  useEffect(() => {
    const handler = () => setSettings(getSettings());
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const handleChange = useCallback(
    (key: ImageKey, cfg: ImageConfig) => {
      const updated = { ...settings, [key]: cfg };
      setSettings(updated);
      saveSettings(updated);
    },
    [settings],
  );

  const handleSaveAll = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetAll = () => {
    const defaults = {
      mel: { ...IMAGE_DEFAULTS.mel },
      shane: { ...IMAGE_DEFAULTS.shane },
      logo: { ...IMAGE_DEFAULTS.logo },
    };
    setSettings(defaults);
    saveSettings(defaults);
  };

  const activeMeta = IMAGES.find((m) => m.key === activeKey)!;
  const activeConfig = settings[activeKey];

  return (
    <div>
      {/* Panel header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
          >
            Image Editor
          </h2>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(232,237,248,0.4)" }}
          >
            Adjust crop, scale, position and aspect for every site image.
            Changes apply instantly — no code needed.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: "rgba(255,107,107,0.06)",
              border: "1px solid rgba(255,107,107,0.2)",
              color: "rgba(255,107,107,0.8)",
            }}
          >
            <RotateCcw size={12} />
            Reset All
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: saved
                ? "rgba(0,212,184,0.12)"
                : "rgba(0,212,184,0.08)",
              border: `1px solid ${saved ? "rgba(0,212,184,0.5)" : "rgba(0,212,184,0.25)"}`,
              color: "#00d4b8",
            }}
          >
            {saved ? <Check size={12} /> : <Save size={12} />}
            {saved ? "Saved to Site!" : "Apply to Site"}
          </button>
        </div>
      </div>

      {/* How-to notice */}
      <div
        className="rounded-xl px-4 py-3 mb-6 flex items-start gap-3"
        style={{
          backgroundColor: "rgba(255,200,50,0.04)",
          border: "1px solid rgba(255,200,50,0.15)",
        }}
      >
        <span style={{ color: "#ffc832", fontSize: "14px", marginTop: "1px" }}>
          ℹ
        </span>
        <div
          className="text-xs"
          style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.6 }}
        >
          <strong style={{ color: "rgba(232,237,248,0.85)" }}>
            How to use:
          </strong>{" "}
          Select an image below, drag the sliders to adjust crop/zoom/position,
          toggle the Grid to see rule-of-thirds lines and crop boundaries (red).
          Changes save automatically and show live on the About page and header.
          Use "Reset" to restore any image to defaults.
        </div>
      </div>

      {/* Image selector tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
        {IMAGES.map((img) => (
          <button
            key={img.key}
            type="button"
            data-ocid={`admin.image_editor.${img.key}.tab`}
            onClick={() => setActiveKey(img.key)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
            style={{
              backgroundColor:
                activeKey === img.key
                  ? `${img.accentColor}12`
                  : "rgba(255,255,255,0.03)",
              border:
                activeKey === img.key
                  ? `1.5px solid ${img.accentColor}45`
                  : "1.5px solid rgba(255,255,255,0.07)",
              color:
                activeKey === img.key
                  ? img.accentColor
                  : "rgba(232,237,248,0.5)",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: img.key === "logo" ? "6px" : "50%",
                overflow: "hidden",
                flexShrink: 0,
                background: "#0a0f1e",
                border: `1px solid ${img.accentColor}30`,
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: img.key === "logo" ? "contain" : "cover",
                  objectPosition: `${settings[img.key].posX}% ${settings[img.key].posY}%`,
                  ...(img.key === "logo"
                    ? { mixBlendMode: "screen" as const }
                    : {}),
                }}
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">{img.label}</div>
              <div
                className="text-xs font-normal"
                style={{ color: "rgba(232,237,248,0.35)" }}
              >
                {img.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Active editor */}
      <ImageEditor
        key={activeKey}
        meta={activeMeta}
        config={activeConfig}
        onChange={handleChange}
      />

      {/* Current values readout */}
      <div
        className="mt-4 rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "rgba(232,237,248,0.25)" }}
        >
          Current CSS Values — {activeMeta.label}
        </p>
        <pre
          className="text-xs"
          style={{
            color: activeMeta.accentColor,
            fontFamily: "monospace",
            lineHeight: 1.7,
          }}
        >
          {cfgToCss(activeConfig)}
        </pre>
      </div>

      {/* Side-by-side comparison for headshots */}
      {(activeKey === "mel" || activeKey === "shane") && (
        <div
          className="mt-6 rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "rgba(232,237,248,0.35)" }}
          >
            Side-by-Side Alignment Check
          </p>
          <div className="grid grid-cols-2 gap-4">
            {(["mel", "shane"] as ImageKey[]).map((k) => {
              const m = IMAGES.find((x) => x.key === k)!;
              const c = settings[k];
              return (
                <div key={k}>
                  <p
                    className="text-xs font-semibold mb-2 text-center"
                    style={{ color: m.accentColor }}
                  >
                    {m.label}
                  </p>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: `${c.containerHeight}px`,
                      overflow: "hidden",
                      borderRadius: "10px",
                      border: `1px solid ${m.accentColor}30`,
                    }}
                  >
                    <img
                      src={m.src}
                      alt={m.label}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: c.fit,
                        objectPosition: `${c.posX}% ${c.posY}%`,
                        transform:
                          c.scale !== 1.0 ? `scale(${c.scale})` : "none",
                        transformOrigin: `center ${c.originY}`,
                      }}
                    />
                    {/* Alignment guide lines */}
                    <svg
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 5,
                        opacity: 0.5,
                      }}
                      viewBox="0 0 100 300"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke="#ff6b6b"
                        strokeWidth="0.6"
                      />
                      <line
                        x1="0"
                        y1="300"
                        x2="100"
                        y2="300"
                        stroke="#ff6b6b"
                        strokeWidth="0.6"
                      />
                      <line
                        x1="50"
                        y1="0"
                        x2="50"
                        y2="300"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.4"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-xs text-center mt-1.5 tabular-nums"
                    style={{ color: "rgba(232,237,248,0.3)" }}
                  >
                    Y: {c.posY}% · Scale: {c.scale} · H: {c.containerHeight}px
                  </p>
                </div>
              );
            })}
          </div>
          <p
            className="text-xs mt-3 text-center"
            style={{ color: "rgba(232,237,248,0.25)" }}
          >
            Red lines = crop boundaries. Match them to align both portraits
            perfectly.
          </p>
        </div>
      )}
    </div>
  );
}
