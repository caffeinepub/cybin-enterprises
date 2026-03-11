/**
 * ImageEditorPanel — full visual editor for every adjustable image on the site.
 * Lives inside the Admin Panel as a tab. All changes persist to localStorage
 * and broadcast to the live site instantly via CustomEvent.
 *
 * Layout: Two-panel preview for headshots:
 *   Panel 1 (left) — FULL PHOTO: entire original image, click/drag to set crop point
 *   Panel 2 (right) — LIVE CROP PREVIEW: exactly what the About page shows
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
  Check,
  ClipboardCopy,
  Crosshair,
  Grid3x3,
  Link2,
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
  /** Natural pixel dimensions of the source photo */
  naturalWidth: number;
  naturalHeight: number;
}

const IMAGES: ImageMeta[] = [
  {
    key: "mel",
    label: "Mel Kotchey",
    description: "About page — Co-Founder & CEO headshot",
    src: melPhoto,
    accentColor: "#00d4b8",
    naturalWidth: 800,
    naturalHeight: 1000,
  },
  {
    key: "shane",
    label: "Shane Suehr",
    description: "About page — Co-Founder & COO headshot",
    src: shanePhoto,
    accentColor: "#a87ef5",
    naturalWidth: 832,
    naturalHeight: 1248,
  },
  {
    key: "logo",
    label: "Cybin Logo",
    description: "Header & Footer logo",
    src: logoPhoto,
    accentColor: "#ffc832",
    naturalWidth: 400,
    naturalHeight: 400,
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

/**
 * Compute the crop-window rect in full-photo coordinates (percent-based).
 *
 * When objectFit=cover, the image is scaled to fill the container.
 * The "visible window" is a rect inside the full image that maps to the container.
 *
 * @param imgW - natural image width (px)
 * @param imgH - natural image height (px)
 * @param containerW - rendered container width (px, e.g. 400)
 * @param containerH - rendered container height (px)
 * @param posX - current posX setting (0–100)
 * @param posY - current posY setting (0–100)
 * @param scale - current scale setting
 * @returns { x, y, w, h } all in percent of the natural image dimensions
 */
function computeCropWindow(
  imgW: number,
  imgH: number,
  containerW: number,
  containerH: number,
  posX: number,
  posY: number,
  scale: number,
) {
  // How does CSS cover scale the image?
  // Scale factor = max(containerW / imgW, containerH / imgH)
  const coverScale = Math.max(containerW / imgW, containerH / imgH);
  // Apply user scale on top
  const totalScale = coverScale * scale;

  // Rendered image size in px
  const renderedW = imgW * totalScale;
  const renderedH = imgH * totalScale;

  // Overflow (clipped pixels) on each side
  const overflowX = Math.max(0, renderedW - containerW);
  const overflowY = Math.max(0, renderedH - containerH);

  // CSS objectPosition percentage maps the overflow: 0% = left-aligned, 100% = right-aligned
  const offsetX = (posX / 100) * overflowX; // px from left of rendered image that is clipped
  const offsetY = (posY / 100) * overflowY;

  // In natural image coordinates:
  const cropX = offsetX / totalScale;
  const cropY = offsetY / totalScale;
  const cropW = containerW / totalScale;
  const cropH = containerH / totalScale;

  return {
    xPct: (cropX / imgW) * 100,
    yPct: (cropY / imgH) * 100,
    wPct: (cropW / imgW) * 100,
    hPct: (cropH / imgH) * 100,
  };
}

// ─── Slider ────────────────────────────────────────────────────────────────────

function SliderControl({
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

// ─── Full Photo Panel (click-to-set-crop) ─────────────────────────────────────

function FullPhotoPanel({
  meta,
  config,
  containerH,
  onSetCrop,
}: {
  meta: ImageMeta;
  config: ImageConfig;
  containerH: number;
  onSetCrop: (posX: number, posY: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Full photo panel renders the ENTIRE original image at its natural aspect ratio.
  // We give the panel a fixed width equivalent and compute the height from the photo's AR.
  // This ensures the whole photo is always visible regardless of containerH.
  const PANEL_W = 400; // Approximate rendered panel width for crop math

  // Full panel height = width * (naturalHeight / naturalWidth), clamped between 300–800px
  const fullPanelH = clamp(
    Math.round(PANEL_W * (meta.naturalHeight / meta.naturalWidth)),
    300,
    800,
  );

  // Compute where the crop window sits relative to the full photo dimensions.
  // We use fullPanelH here so the crop overlay is accurate within the full-photo view.
  const cropWindow = computeCropWindow(
    meta.naturalWidth,
    meta.naturalHeight,
    PANEL_W,
    containerH, // crop preview height -- this is what gets cropped to on the live site
    config.posX,
    config.posY,
    config.scale,
  );

  // The full-photo panel uses objectFit: contain.
  // With contain, the image fills the panel width entirely (portrait photos).
  // The rendered image height inside the panel = PANEL_W * (naturalHeight / naturalWidth).
  // But the panel itself is fullPanelH. If the rendered image is shorter than the panel,
  // there will be letterboxing (black bars top/bottom). We need to offset the crop overlay.
  const renderedImgH = PANEL_W * (meta.naturalHeight / meta.naturalWidth);
  const letterboxTopPct =
    renderedImgH < fullPanelH
      ? ((fullPanelH - renderedImgH) / 2 / fullPanelH) * 100
      : 0;
  const imgHeightPct = (renderedImgH / fullPanelH) * 100;

  const handlePointerEvent = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      // Click position as percent of the full-photo panel
      const clickXPct = clamp(
        ((e.clientX - rect.left) / rect.width) * 100,
        0,
        100,
      );
      const clickYPct = clamp(
        ((e.clientY - rect.top) / rect.height) * 100,
        0,
        100,
      );

      // The full photo is displayed with objectFit: contain, so there may be letterboxing.
      // With contain, the image fills width (since these are portrait photos).
      // The photo's aspect ratio: naturalWidth / naturalHeight
      const photoAspect = meta.naturalWidth / meta.naturalHeight;
      const panelAspect = rect.width / rect.height;

      let photoAreaX: number;
      let photoAreaY: number;
      let photoAreaW: number;
      let photoAreaH: number;

      if (photoAspect < panelAspect) {
        // Photo is taller — pillarboxed (centered horizontally)
        photoAreaH = 100; // full height
        photoAreaW = (photoAspect / panelAspect) * 100;
        photoAreaX = (100 - photoAreaW) / 2;
        photoAreaY = 0;
      } else {
        // Photo is wider — letterboxed (centered vertically)
        photoAreaW = 100; // full width
        photoAreaH = (panelAspect / photoAspect) * 100;
        photoAreaX = 0;
        photoAreaY = (100 - photoAreaH) / 2;
      }

      // Is the click within the actual photo area?
      if (
        clickXPct < photoAreaX ||
        clickXPct > photoAreaX + photoAreaW ||
        clickYPct < photoAreaY ||
        clickYPct > photoAreaY + photoAreaH
      ) {
        return; // Clicked on letterbox area, ignore
      }

      // Map click to 0–100% within the photo
      const inPhotoX = clamp(
        ((clickXPct - photoAreaX) / photoAreaW) * 100,
        0,
        100,
      );
      const inPhotoY = clamp(
        ((clickYPct - photoAreaY) / photoAreaH) * 100,
        0,
        100,
      );

      // Now convert "where in photo did you click" to the CSS objectPosition value.
      // objectPosition posY means: what % of the overflow does the crop start at.
      // If we want to center the crop on the click point, we need to back-calculate.
      // The crop window width/height in photo-percent:
      const cropWPct = cropWindow.wPct;
      const cropHPct = cropWindow.hPct;

      // We want the center of the crop window to be at (inPhotoX, inPhotoY).
      // The crop starts at center - half of cropSize.
      const desiredCropStartX = inPhotoX - cropWPct / 2;
      const desiredCropStartY = inPhotoY - cropHPct / 2;

      // Convert crop start (as % of photo) to objectPosition percentage.
      // overflowX in photo-% = 100 - cropWPct
      // posX = desiredCropStart / overflow * 100
      const overflowXPct = Math.max(0, 100 - cropWPct);
      const overflowYPct = Math.max(0, 100 - cropHPct);

      let newPosX =
        overflowXPct > 0
          ? clamp((desiredCropStartX / overflowXPct) * 100, 0, 100)
          : 50;
      let newPosY =
        overflowYPct > 0
          ? clamp((desiredCropStartY / overflowYPct) * 100, 0, 100)
          : 50;

      newPosX = Math.round(newPosX);
      newPosY = Math.round(newPosY);

      onSetCrop(newPosX, newPosY);
    },
    [
      meta.naturalWidth,
      meta.naturalHeight,
      cropWindow.wPct,
      cropWindow.hPct,
      onSetCrop,
    ],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    handlePointerEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    handlePointerEvent(e);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          style={{ color: "rgba(232,237,248,0.4)" }}
        >
          <Crosshair size={11} style={{ color: meta.accentColor }} />
          FULL PHOTO — click or drag to set crop point
        </span>
      </div>

      {/* Full photo panel — sized to show the ENTIRE original image */}
      <div
        ref={panelRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          height: `${fullPanelH}px`,
          borderRadius: "12px",
          border: `1px solid ${meta.accentColor}30`,
          background: "#060a15",
          cursor: "crosshair",
          overflow: "hidden",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        {/* Full image — objectFit contain so nothing is cropped */}
        <img
          src={meta.src}
          alt={`${meta.label} — original uncropped`}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Dark overlay mask — covers everything outside the crop window.
            All positions are in PANEL coordinates (accounting for letterbox offset). */}
        {config.fit === "cover" &&
          (() => {
            // Convert crop window from natural-image-% to panel-% by accounting for letterboxing.
            // The image occupies [letterboxTopPct, letterboxTopPct + imgHeightPct] vertically.
            // Horizontally the image always fills 100% width for portrait photos.
            const panelCropTop =
              letterboxTopPct + (cropWindow.yPct / 100) * imgHeightPct;
            const panelCropH = (cropWindow.hPct / 100) * imgHeightPct;
            const panelCropBottom = 100 - panelCropTop - panelCropH;
            const panelCropLeft = cropWindow.xPct; // X is always 0–100% of full width
            const panelCropW = cropWindow.wPct;
            const panelCropRight = 100 - panelCropLeft - panelCropW;
            return (
              <>
                {/* Top mask */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: `${panelCropTop}%`,
                    background: "rgba(0,0,0,0.65)",
                    pointerEvents: "none",
                  }}
                />
                {/* Bottom mask */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: `${Math.max(0, panelCropBottom)}%`,
                    background: "rgba(0,0,0,0.65)",
                    pointerEvents: "none",
                  }}
                />
                {/* Left mask */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: `${panelCropTop}%`,
                    height: `${panelCropH}%`,
                    left: 0,
                    width: `${panelCropLeft}%`,
                    background: "rgba(0,0,0,0.65)",
                    pointerEvents: "none",
                  }}
                />
                {/* Right mask */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: `${panelCropTop}%`,
                    height: `${panelCropH}%`,
                    right: 0,
                    width: `${Math.max(0, panelCropRight)}%`,
                    background: "rgba(0,0,0,0.65)",
                    pointerEvents: "none",
                  }}
                />

                {/* Crop window border */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: `${panelCropLeft}%`,
                    top: `${panelCropTop}%`,
                    width: `${panelCropW}%`,
                    height: `${panelCropH}%`,
                    border: `2px solid ${meta.accentColor}`,
                    borderRadius: "4px",
                    pointerEvents: "none",
                    boxShadow: `0 0 0 1px rgba(0,0,0,0.5), inset 0 0 12px ${meta.accentColor}18`,
                  }}
                />

                {/* Crop window corner handles */}
                {/* Top-left */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    background: meta.accentColor,
                    borderRadius: "2px",
                    pointerEvents: "none",
                    top: `calc(${panelCropTop}% - 1px)`,
                    left: `calc(${panelCropLeft}% - 1px)`,
                  }}
                />
                {/* Top-right */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    background: meta.accentColor,
                    borderRadius: "2px",
                    pointerEvents: "none",
                    top: `calc(${panelCropTop}% - 1px)`,
                    right: `calc(${Math.max(0, panelCropRight)}% - 1px)`,
                  }}
                />
                {/* Bottom-left */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    background: meta.accentColor,
                    borderRadius: "2px",
                    pointerEvents: "none",
                    bottom: `calc(${Math.max(0, panelCropBottom)}% - 1px)`,
                    left: `calc(${panelCropLeft}% - 1px)`,
                  }}
                />
                {/* Bottom-right */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    background: meta.accentColor,
                    borderRadius: "2px",
                    pointerEvents: "none",
                    bottom: `calc(${Math.max(0, panelCropBottom)}% - 1px)`,
                    right: `calc(${Math.max(0, panelCropRight)}% - 1px)`,
                  }}
                />

                {/* Center crosshair inside crop window */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: `${panelCropLeft + panelCropW / 2}%`,
                    top: `${panelCropTop + panelCropH / 2}%`,
                    transform: "translate(-50%, -50%)",
                    width: "16px",
                    height: "16px",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      background: `${meta.accentColor}80`,
                      transform: "translateX(-50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: `${meta.accentColor}80`,
                      transform: "translateY(-50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: meta.accentColor,
                    }}
                  />
                </div>
              </>
            );
          })()}

        {/* Hover instruction */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${meta.accentColor}30`,
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "9px",
            fontFamily: "monospace",
            color: "rgba(232,237,248,0.55)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          Click or drag the bright area to reframe
        </div>
      </div>

      <div
        className="mt-2 flex items-center gap-3 text-xs flex-wrap"
        style={{ color: "rgba(232,237,248,0.35)" }}
      >
        <span style={{ color: meta.accentColor }}>□</span> Bright border = crop
        window
        <span style={{ color: "rgba(255,255,255,0.25)" }}>■</span> Dark area =
        cropped out
      </div>
    </div>
  );
}

// ─── Single Image Editor ───────────────────────────────────────────────────────

function ImageEditor({
  meta,
  config,
  onChange,
  onMatch,
  otherLabel,
}: {
  meta: ImageMeta;
  config: ImageConfig;
  onChange: (key: ImageKey, cfg: ImageConfig) => void;
  onMatch?: () => void;
  otherLabel?: string;
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

  const handleCropClick = useCallback(
    (posX: number, posY: number) => {
      set({ posX, posY });
    },
    [set],
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

  const containerH =
    meta.key === "logo"
      ? Math.max(displayCfg.containerHeight, 64)
      : displayCfg.containerHeight;

  const isHeadshot = meta.key !== "logo";

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
        <div className="flex items-center gap-2 flex-wrap justify-end">
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
          {/* Match to other portrait */}
          {onMatch && (
            <button
              type="button"
              onClick={onMatch}
              title={`Copy ${otherLabel ?? "other"}'s settings to this portrait`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                backgroundColor: "rgba(255,200,50,0.08)",
                border: "1px solid rgba(255,200,50,0.3)",
                color: "#ffc832",
              }}
            >
              <Link2 size={12} className="inline mr-1" />
              Match {otherLabel ?? "Other"}
            </button>
          )}
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

      <div className="p-5">
        {/* ── DUAL PREVIEW LAYOUT (headshots only) ────────────────────────── */}
        {isHeadshot ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            {/* Panel 1: Full Photo (click to set crop) */}
            <FullPhotoPanel
              meta={meta}
              config={displayCfg}
              containerH={containerH}
              onSetCrop={handleCropClick}
            />

            {/* Panel 2: Live Crop Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "rgba(232,237,248,0.4)" }}
                >
                  {compareMode ? "DEFAULT CROP PREVIEW" : "LIVE CROP PREVIEW"}
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
                  {containerH}px tall
                </span>
              </div>

              {/* Crop preview container */}
              <div
                ref={containerRef}
                style={{
                  position: "relative",
                  width: "100%",
                  height: `${containerH}px`,
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: `1px solid ${meta.accentColor}30`,
                  background: "#080d1a",
                }}
              >
                {/* Actual image — same rendering as live About page */}
                <img
                  src={meta.src}
                  alt={meta.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: displayCfg.fit,
                    objectPosition:
                      displayCfg.scale === 1.0
                        ? `center ${displayCfg.posY}%`
                        : "center center",
                    transform: (() => {
                      const xShift = displayCfg.posX - 50;
                      const yShift = displayCfg.posY - 50;
                      const parts: string[] = [];
                      if (xShift !== 0)
                        parts.push(`translateX(${xShift * 0.6}%)`);
                      if (displayCfg.scale !== 1.0 && yShift !== 0)
                        parts.push(`translateY(${-yShift * 0.6}%)`);
                      if (displayCfg.scale !== 1.0)
                        parts.push(`scale(${displayCfg.scale})`);
                      return parts.length > 0 ? parts.join(" ") : "none";
                    })(),
                    transformOrigin: `center ${displayCfg.originY}`,
                    transition: "transform 0.1s ease",
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
                    <circle
                      cx="150"
                      cy="150"
                      r="2"
                      fill="#fff"
                      fillOpacity="0.5"
                    />
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
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      meta.key === "mel"
                        ? "linear-gradient(to right, rgba(110,247,212,0.15) 0%, transparent 20%, transparent 80%, rgba(110,247,212,0.12) 100%)"
                        : "linear-gradient(to right, rgba(124,92,191,0.17) 0%, transparent 20%, transparent 80%, rgba(124,92,191,0.14) 100%)",
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                    zIndex: 2,
                  }}
                />
              </div>

              {/* Crop line alignment helper */}
              <div
                className="mt-2 flex items-center gap-3 text-xs flex-wrap"
                style={{ color: "rgba(232,237,248,0.4)" }}
              >
                <span style={{ color: "#ff6b6b" }}>▬</span> Red lines = crop
                boundaries
                <span style={{ color: meta.accentColor }}>●</span> Dots = thirds
                intersections
              </div>
            </div>
          </div>
        ) : (
          /* ── LOGO: single preview panel ─────────────────────────────────── */
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "rgba(232,237,248,0.4)" }}
              >
                {compareMode ? "DEFAULT PREVIEW" : "LIVE PREVIEW"}
              </span>
              <span
                className="text-xs tabular-nums"
                style={{ color: "rgba(232,237,248,0.3)" }}
              >
                {containerH}px
              </span>
            </div>
            <div
              ref={containerRef}
              style={{
                position: "relative",
                width: "100%",
                height: `${containerH}px`,
                overflow: "hidden",
                borderRadius: "8px",
                border: `1px solid ${meta.accentColor}30`,
                background: "#0a0f1e",
              }}
            >
              <img
                src={meta.src}
                alt={meta.label}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: displayCfg.fit,
                  objectPosition:
                    displayCfg.scale === 1.0
                      ? `center ${displayCfg.posY}%`
                      : "center center",
                  transform: (() => {
                    const xShift = displayCfg.posX - 50;
                    const yShift = displayCfg.posY - 50;
                    const parts: string[] = [];
                    if (xShift !== 0)
                      parts.push(`translateX(${xShift * 0.6}%)`);
                    if (displayCfg.scale !== 1.0 && yShift !== 0)
                      parts.push(`translateY(${-yShift * 0.6}%)`);
                    if (displayCfg.scale !== 1.0)
                      parts.push(`scale(${displayCfg.scale})`);
                    return parts.length > 0 ? parts.join(" ") : "none";
                  })(),
                  transformOrigin: `center ${displayCfg.originY}`,
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>
        )}

        {/* ── CONTROLS ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
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
            {isHeadshot && (
              <p
                className="text-xs mb-3"
                style={{ color: "rgba(232,237,248,0.3)" }}
              >
                Tip: click or drag directly on the Full Photo to set crop point
                visually
              </p>
            )}
            <div className="space-y-4">
              <SliderControl
                label="Horizontal (X)"
                value={round2(config.posX)}
                min={0}
                max={100}
                step={1}
                unit="%"
                accentColor={meta.accentColor}
                onChange={(v) => set({ posX: v })}
              />
              <SliderControl
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

          {/* Zoom */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(232,237,248,0.35)" }}
              >
                Zoom
              </p>
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: meta.accentColor }}
              >
                {Math.round(config.scale * 100)}%
              </span>
            </div>

            {/* Big zoom buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="admin.image_editor.zoom_out.button"
                onClick={() =>
                  set({ scale: clamp(round2(config.scale - 0.05), 0.3, 3.0) })
                }
                className="flex items-center justify-center rounded-xl font-bold text-2xl transition-all active:scale-95"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(232,237,248,0.8)",
                  flexShrink: 0,
                  fontSize: "22px",
                  lineHeight: 1,
                  cursor: "pointer",
                  userSelect: "none",
                }}
                title="Zoom out"
              >
                −
              </button>

              <div style={{ flex: 1, position: "relative" }}>
                <input
                  type="range"
                  min={0.3}
                  max={3.0}
                  step={0.01}
                  value={config.scale}
                  onChange={(e) =>
                    set({ scale: clamp(Number(e.target.value), 0.3, 3.0) })
                  }
                  style={{
                    width: "100%",
                    height: "6px",
                    appearance: "none",
                    WebkitAppearance: "none",
                    background: `linear-gradient(to right, ${meta.accentColor} 0%, ${meta.accentColor} ${((config.scale - 0.3) / 2.7) * 100}%, rgba(255,255,255,0.1) ${((config.scale - 0.3) / 2.7) * 100}%, rgba(255,255,255,0.1) 100%)`,
                    borderRadius: "3px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "6px",
                    paddingLeft: "1px",
                    paddingRight: "1px",
                  }}
                >
                  {[50, 100, 150, 200, 250].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => set({ scale: pct / 100 })}
                      style={{
                        fontSize: "9px",
                        color:
                          Math.round(config.scale * 100) === pct
                            ? meta.accentColor
                            : "rgba(232,237,248,0.25)",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        padding: "0",
                        fontWeight:
                          Math.round(config.scale * 100) === pct ? 700 : 400,
                        transition: "color 0.15s",
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                data-ocid="admin.image_editor.zoom_in.button"
                onClick={() =>
                  set({ scale: clamp(round2(config.scale + 0.05), 0.3, 3.0) })
                }
                className="flex items-center justify-center rounded-xl font-bold transition-all active:scale-95"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: `${meta.accentColor}14`,
                  border: `1px solid ${meta.accentColor}40`,
                  color: meta.accentColor,
                  flexShrink: 0,
                  fontSize: "22px",
                  lineHeight: 1,
                  cursor: "pointer",
                  userSelect: "none",
                }}
                title="Zoom in"
              >
                +
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              {[
                { label: "Fit", value: 0.5 },
                { label: "Normal", value: 1.0 },
                { label: "Close", value: 1.5 },
                { label: "Fill", value: 2.0 },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => set({ scale: value })}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    backgroundColor:
                      Math.abs(config.scale - value) < 0.03
                        ? `${meta.accentColor}18`
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${Math.abs(config.scale - value) < 0.03 ? `${meta.accentColor}50` : "rgba(255,255,255,0.08)"}`,
                    color:
                      Math.abs(config.scale - value) < 0.03
                        ? meta.accentColor
                        : "rgba(232,237,248,0.45)",
                  }}
                >
                  {label}
                </button>
              ))}
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
            <SliderControl
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
        </div>

        {/* Copy CSS */}
        <button
          type="button"
          onClick={handleCopyCss}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all mt-5"
          style={{
            backgroundColor: showCopied
              ? "rgba(110,247,212,0.12)"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${showCopied ? "rgba(110,247,212,0.4)" : "rgba(255,255,255,0.08)"}`,
            color: showCopied ? "#00d4b8" : "rgba(232,237,248,0.45)",
          }}
        >
          {showCopied ? <Check size={12} /> : <ClipboardCopy size={12} />}
          {showCopied ? "Copied to clipboard!" : "Copy CSS style object"}
        </button>
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
                ? "rgba(110,247,212,0.12)"
                : "rgba(110,247,212,0.08)",
              border: `1px solid ${saved ? "rgba(110,247,212,0.5)" : "rgba(110,247,212,0.25)"}`,
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
          Select an image tab below. For headshots, the{" "}
          <strong style={{ color: "rgba(232,237,248,0.75)" }}>
            left panel
          </strong>{" "}
          shows the full original photo — click or drag anywhere on it to
          precisely set the crop point. The{" "}
          <strong style={{ color: "rgba(232,237,248,0.75)" }}>
            right panel
          </strong>{" "}
          shows exactly what the live site shows. Toggle Grid to see
          rule-of-thirds lines and crop boundaries.
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
        onMatch={
          activeKey === "mel"
            ? () => handleChange("mel", { ...settings.shane })
            : activeKey === "shane"
              ? () => handleChange("shane", { ...settings.mel })
              : undefined
        }
        otherLabel={
          activeKey === "mel"
            ? "Shane"
            : activeKey === "shane"
              ? "Mel"
              : undefined
        }
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

      {/* Side-by-side alignment check for headshots */}
      {(activeKey === "mel" || activeKey === "shane") && (
        <div
          className="mt-6 rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              Side-by-Side Alignment Check
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                data-ocid="admin.image_editor.match_mel.button"
                onClick={() => handleChange("mel", { ...settings.shane })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(110,247,212,0.08)",
                  border: "1px solid rgba(110,247,212,0.3)",
                  color: "#00d4b8",
                }}
                title="Copy Shane's current settings to Mel"
              >
                <Link2 size={11} />
                Mel ← Shane
              </button>
              <button
                type="button"
                data-ocid="admin.image_editor.match_shane.button"
                onClick={() => handleChange("shane", { ...settings.mel })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(168,126,245,0.08)",
                  border: "1px solid rgba(168,126,245,0.3)",
                  color: "#a87ef5",
                }}
                title="Copy Mel's current settings to Shane"
              >
                <Link2 size={11} />
                Shane ← Mel
              </button>
            </div>
          </div>
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
                        objectPosition: `center ${c.posY}%`,
                        transform: (() => {
                          const xShift = c.posX - 50;
                          const parts: string[] = [];
                          if (xShift !== 0)
                            parts.push(`translateX(${xShift * 0.6}%)`);
                          if (c.scale !== 1.0) parts.push(`scale(${c.scale})`);
                          return parts.length > 0 ? parts.join(" ") : "none";
                        })(),
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
