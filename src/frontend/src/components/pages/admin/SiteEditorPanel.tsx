/**
 * SiteEditorPanel — Full-site visual editor for Cybin Enterprises admin panel.
 *
 * Features:
 * - Drag-and-drop image crop repositioning (click + drag directly on preview)
 * - Inline text editing for all copy: hero, about, contact, etc.
 * - Live color pickers for accent colors, backgrounds, text
 * - Image scale slider with real-time preview
 * - Section-based organization with clear UX
 * - All changes broadcast instantly via CustomEvent and persist to localStorage
 */

import {
  IMAGE_DEFAULTS,
  EVENT_NAME as IMAGE_EVENT,
  type ImageConfig,
  type ImageKey,
  getSettings as getImageSettings,
  saveSettings as saveImageSettings,
} from "@/hooks/useImageSettings";
import {
  SITE_DEFAULTS,
  SITE_SETTINGS_EVENT,
  type SiteSettings,
  getSiteSettings,
  saveSiteSettings,
} from "@/hooks/useSiteSettings";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Grid3x3,
  Maximize2,
  Minimize2,
  Move,
  Palette,
  RefreshCw,
  RotateCcw,
  Save,
  Type,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import logoPhoto from "/assets/cybin-logo.png";
import melPhoto from "/assets/mel-headshot.jpeg";
import shanePhoto from "/assets/uploads/IMG_2988-1.jpeg";

// ─── Types ─────────────────────────────────────────────────────────────────────

type EditorSection =
  | "images"
  | "hero"
  | "about"
  | "contact"
  | "colors"
  | "compare";

// ─── Color Picker ──────────────────────────────────────────────────────────────

function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className="text-xs font-medium"
        style={{ color: "rgba(232,237,248,0.7)" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value.startsWith("rgba") ? "#00d4b8" : value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            backgroundColor: "transparent",
            padding: "2px",
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "120px",
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#e8edf8",
            fontSize: "11px",
            fontFamily: "monospace",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── Text Field ────────────────────────────────────────────────────────────────

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  accentColor = "#00d4b8",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  accentColor?: string;
}) {
  const [focused, setFocused] = useState(false);
  const fieldId = useId();

  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "8px",
    border: `1px solid ${focused ? `${accentColor}60` : "rgba(255,255,255,0.1)"}`,
    backgroundColor: "rgba(255,255,255,0.04)",
    color: "#e8edf8",
    fontSize: "13px",
    lineHeight: "1.5",
    outline: "none",
    resize: multiline ? "vertical" : "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s ease",
    minHeight: multiline ? "80px" : undefined,
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      <label
        htmlFor={fieldId}
        style={{
          display: "block",
          fontSize: "11px",
          fontWeight: 600,
          color: "rgba(232,237,248,0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "5px",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={baseStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={fieldId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={baseStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

// ─── Section Wrapper ───────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon: Icon,
  accentColor,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  accentColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        borderRadius: "16px",
        border: `1px solid ${accentColor}20`,
        backgroundColor: `${accentColor}06`,
        marginBottom: "16px",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: `${accentColor}0a`,
          border: "none",
          cursor: "pointer",
          borderBottom: open ? `1px solid ${accentColor}15` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              backgroundColor: `${accentColor}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={14} style={{ color: accentColor }} />
          </div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#e8edf8",
              fontFamily: "Sora, sans-serif",
            }}
          >
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp size={14} style={{ color: "rgba(232,237,248,0.4)" }} />
        ) : (
          <ChevronDown size={14} style={{ color: "rgba(232,237,248,0.4)" }} />
        )}
      </button>
      {open && <div style={{ padding: "16px 18px" }}>{children}</div>}
    </div>
  );
}

// ─── Drag-to-Reposition Image Editor ──────────────────────────────────────────

interface DragImageEditorProps {
  imageKey: ImageKey;
  src: string;
  label: string;
  accentColor: string;
  config: ImageConfig;
  onChange: (key: ImageKey, cfg: ImageConfig) => void;
}

function DragImageEditor({
  imageKey,
  src,
  label,
  accentColor,
  config,
  onChange,
}: DragImageEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const dragStart = useRef<{
    x: number;
    y: number;
    posX: number;
    posY: number;
  } | null>(null);

  const set = useCallback(
    (partial: Partial<ImageConfig>) => {
      onChange(imageKey, { ...config, ...partial });
    },
    [config, imageKey, onChange],
  );

  // Mouse drag for crop repositioning
  const handleMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: config.posX,
      posY: config.posY,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Map drag pixels to 0-100% range relative to container size
      // Dragging right → image moves right → posX increases
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const pctPerPxX = 100 / rect.width;
      const pctPerPxY = 100 / rect.height;
      const newX = Math.max(
        0,
        Math.min(100, dragStart.current.posX + dx * pctPerPxX),
      );
      const newY = Math.max(
        0,
        Math.min(100, dragStart.current.posY + dy * pctPerPxY),
      );
      set({
        posX: Math.round(newX * 10) / 10,
        posY: Math.round(newY * 10) / 10,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStart.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, set]);

  // Touch drag support
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setIsDragging(true);
    dragStart.current = {
      x: t.clientX,
      y: t.clientY,
      posX: config.posX,
      posY: config.posY,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStart.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const t = e.touches[0];
      const dx = t.clientX - dragStart.current.x;
      const dy = t.clientY - dragStart.current.y;
      const pctPerPxX = 100 / rect.width;
      const pctPerPxY = 100 / rect.height;
      const newX = Math.max(
        0,
        Math.min(100, dragStart.current.posX + dx * pctPerPxX),
      );
      const newY = Math.max(
        0,
        Math.min(100, dragStart.current.posY + dy * pctPerPxY),
      );
      set({
        posX: Math.round(newX * 10) / 10,
        posY: Math.round(newY * 10) / 10,
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      dragStart.current = null;
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, set]);

  const containerHeight =
    imageKey === "logo" ? config.containerHeight : config.containerHeight;

  return (
    <div style={{ marginBottom: "8px" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: accentColor,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle alignment grid"
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              border: `1px solid ${showGrid ? `${accentColor}50` : "rgba(255,255,255,0.1)"}`,
              backgroundColor: showGrid
                ? `${accentColor}18`
                : "rgba(255,255,255,0.04)",
              color: showGrid ? accentColor : "rgba(232,237,248,0.5)",
              fontSize: "11px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Grid3x3 size={11} />
            Grid
          </button>
          <button
            type="button"
            onClick={() => onChange(imageKey, { ...IMAGE_DEFAULTS[imageKey] })}
            title="Reset to defaults"
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              border: "1px solid rgba(255,107,107,0.25)",
              backgroundColor: "rgba(255,107,107,0.06)",
              color: "rgba(255,107,107,0.8)",
              fontSize: "11px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>
      </div>

      {/* Drag preview */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: "relative",
          width: "100%",
          height: `${containerHeight}px`,
          overflow: "hidden",
          borderRadius: imageKey === "logo" ? "8px" : "14px",
          border: `2px solid ${isDragging ? accentColor : `${accentColor}30`}`,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          backgroundColor: "#080d1a",
          transition: "border-color 0.15s ease",
        }}
      >
        <img
          src={src}
          alt={label}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: config.fit,
            objectPosition: `center ${config.posY}%`,
            transform: (() => {
              const xShift = config.posX - 50;
              const parts: string[] = [];
              if (xShift !== 0) parts.push(`translateX(${xShift * 0.6}%)`);
              if (config.scale !== 1.0) parts.push(`scale(${config.scale})`);
              return parts.length > 0 ? parts.join(" ") : "none";
            })(),
            transformOrigin: `center ${config.originY}`,
            pointerEvents: "none",
            userSelect: "none",
            transition: isDragging ? "none" : "transform 0.1s ease",
            ...(imageKey === "logo" ? { mixBlendMode: "screen" as const } : {}),
          }}
        />

        {/* Grid overlay */}
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
              stroke={accentColor}
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            <line
              x1="200"
              y1="0"
              x2="200"
              y2="300"
              stroke={accentColor}
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            <line
              x1="0"
              y1="100"
              x2="300"
              y2="100"
              stroke={accentColor}
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            <line
              x1="0"
              y1="200"
              x2="300"
              y2="200"
              stroke={accentColor}
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            <line
              x1="150"
              y1="0"
              x2="150"
              y2="300"
              stroke="#fff"
              strokeWidth="0.4"
              strokeOpacity="0.25"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1="150"
              x2="300"
              y2="150"
              stroke="#fff"
              strokeWidth="0.4"
              strokeOpacity="0.25"
              strokeDasharray="4 4"
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
            <circle
              cx="100"
              cy="100"
              r="2.5"
              fill={accentColor}
              fillOpacity="0.8"
            />
            <circle
              cx="200"
              cy="100"
              r="2.5"
              fill={accentColor}
              fillOpacity="0.8"
            />
            <circle
              cx="100"
              cy="200"
              r="2.5"
              fill={accentColor}
              fillOpacity="0.8"
            />
            <circle
              cx="200"
              cy="200"
              r="2.5"
              fill={accentColor}
              fillOpacity="0.8"
            />
            <text
              x="4"
              y="12"
              fill="#ff6b6b"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.9"
            >
              TOP
            </text>
            <text
              x="4"
              y="293"
              fill="#ff6b6b"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.9"
            >
              BOTTOM
            </text>
          </svg>
        )}

        {/* Drag hint overlay */}
        {!isDragging && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
            className="drag-hint"
          >
            <div
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                backgroundColor: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <Move size={12} />
              Drag to reposition
            </div>
          </div>
        )}

        {/* Active drag indicator */}
        {isDragging && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 12px",
              borderRadius: "12px",
              backgroundColor: `${accentColor}cc`,
              fontSize: "10px",
              color: "#0a0f1e",
              fontWeight: 700,
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            DRAGGING
          </div>
        )}
      </div>

      {/* Coordinate readout */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "6px",
          fontSize: "10px",
          color: "rgba(232,237,248,0.35)",
          fontFamily: "monospace",
        }}
      >
        <span>X: {config.posX.toFixed(1)}%</span>
        <span>Y: {config.posY.toFixed(1)}%</span>
        <span>Scale: {config.scale.toFixed(2)}x</span>
        <span>H: {containerHeight}px</span>
      </div>

      {/* Explicit X / Y position sliders — always work regardless of fit mode */}
      <div
        style={{
          marginTop: "10px",
          padding: "10px 12px",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "rgba(232,237,248,0.35)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          Position (Crop Point)
        </p>

        {/* X slider */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(232,237,248,0.55)" }}>
              ← Horizontal (X) →
            </span>
            <span
              style={{
                fontSize: "11px",
                color: accentColor,
                fontFamily: "monospace",
              }}
            >
              {config.posX.toFixed(1)}%
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              onClick={() => set({ posX: Math.max(0, config.posX - 5) })}
              style={{
                padding: "3px 7px",
                borderRadius: "5px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              ←
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={config.posX}
              onChange={(e) => set({ posX: Number(e.target.value) })}
              style={{
                flex: 1,
                height: "4px",
                appearance: "none",
                WebkitAppearance: "none",
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${config.posX}%, rgba(255,255,255,0.1) ${config.posX}%, rgba(255,255,255,0.1) 100%)`,
                borderRadius: "2px",
                outline: "none",
                cursor: "pointer",
              }}
            />
            <button
              type="button"
              onClick={() => set({ posX: Math.min(100, config.posX + 5) })}
              style={{
                padding: "3px 7px",
                borderRadius: "5px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Y slider */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(232,237,248,0.55)" }}>
              ↑ Vertical (Y) ↓
            </span>
            <span
              style={{
                fontSize: "11px",
                color: accentColor,
                fontFamily: "monospace",
              }}
            >
              {config.posY.toFixed(1)}%
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              onClick={() => set({ posY: Math.max(0, config.posY - 5) })}
              style={{
                padding: "3px 7px",
                borderRadius: "5px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              ↑
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={config.posY}
              onChange={(e) => set({ posY: Number(e.target.value) })}
              style={{
                flex: 1,
                height: "4px",
                appearance: "none",
                WebkitAppearance: "none",
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${config.posY}%, rgba(255,255,255,0.1) ${config.posY}%, rgba(255,255,255,0.1) 100%)`,
                borderRadius: "2px",
                outline: "none",
                cursor: "pointer",
              }}
            />
            <button
              type="button"
              onClick={() => set({ posY: Math.min(100, config.posY + 5) })}
              style={{
                padding: "3px 7px",
                borderRadius: "5px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Scale slider */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(232,237,248,0.5)" }}>
              Zoom / Scale
            </span>
            <span
              style={{
                fontSize: "11px",
                color: accentColor,
                fontFamily: "monospace",
              }}
            >
              {config.scale.toFixed(2)}x
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={() => set({ scale: Math.max(0.3, config.scale - 0.05) })}
              style={{
                padding: "4px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
              }}
            >
              <ZoomOut size={12} />
            </button>
            <input
              type="range"
              min={0.3}
              max={2.0}
              step={0.01}
              value={config.scale}
              onChange={(e) => set({ scale: Number(e.target.value) })}
              style={{
                flex: 1,
                height: "4px",
                appearance: "none",
                WebkitAppearance: "none",
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((config.scale - 0.3) / 1.7) * 100}%, rgba(255,255,255,0.1) ${((config.scale - 0.3) / 1.7) * 100}%, rgba(255,255,255,0.1) 100%)`,
                borderRadius: "2px",
                outline: "none",
                cursor: "pointer",
              }}
            />
            <button
              type="button"
              onClick={() => set({ scale: Math.min(2.0, config.scale + 0.05) })}
              style={{
                padding: "4px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
              }}
            >
              <ZoomIn size={12} />
            </button>
          </div>
        </div>

        {/* Height slider */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(232,237,248,0.5)" }}>
              Container Height
            </span>
            <span
              style={{
                fontSize: "11px",
                color: accentColor,
                fontFamily: "monospace",
              }}
            >
              {config.containerHeight}px
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={() =>
                set({
                  containerHeight: Math.max(
                    imageKey === "logo" ? 40 : 300,
                    config.containerHeight - 20,
                  ),
                })
              }
              style={{
                padding: "4px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
              }}
            >
              <Minimize2 size={12} />
            </button>
            <input
              type="range"
              min={imageKey === "logo" ? 40 : 300}
              max={imageKey === "logo" ? 200 : 900}
              step={imageKey === "logo" ? 4 : 10}
              value={config.containerHeight}
              onChange={(e) => set({ containerHeight: Number(e.target.value) })}
              style={{
                flex: 1,
                height: "4px",
                appearance: "none",
                WebkitAppearance: "none",
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((config.containerHeight - (imageKey === "logo" ? 40 : 300)) / ((imageKey === "logo" ? 200 : 900) - (imageKey === "logo" ? 40 : 300))) * 100}%, rgba(255,255,255,0.1) ${((config.containerHeight - (imageKey === "logo" ? 40 : 300)) / ((imageKey === "logo" ? 200 : 900) - (imageKey === "logo" ? 40 : 300))) * 100}%, rgba(255,255,255,0.1) 100%)`,
                borderRadius: "2px",
                outline: "none",
                cursor: "pointer",
              }}
            />
            <button
              type="button"
              onClick={() =>
                set({
                  containerHeight: Math.min(
                    imageKey === "logo" ? 200 : 900,
                    config.containerHeight + 20,
                  ),
                })
              }
              style={{
                padding: "4px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(232,237,248,0.6)",
                cursor: "pointer",
              }}
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>

        {/* Fit mode */}
        <div style={{ display: "flex", gap: "6px" }}>
          {(["cover", "contain", "fill"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => set({ fit: mode })}
              style={{
                flex: 1,
                padding: "5px",
                borderRadius: "6px",
                border: `1px solid ${config.fit === mode ? `${accentColor}50` : "rgba(255,255,255,0.08)"}`,
                backgroundColor:
                  config.fit === mode
                    ? `${accentColor}18`
                    : "rgba(255,255,255,0.03)",
                color:
                  config.fit === mode ? accentColor : "rgba(232,237,248,0.45)",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Side-by-Side Alignment Panel ─────────────────────────────────────────────

function AlignmentPanel({
  imageSettings,
}: {
  imageSettings: Record<ImageKey, ImageConfig>;
}) {
  const images = [
    {
      key: "mel" as ImageKey,
      src: melPhoto,
      label: "Mel Kotchey",
      accent: "#00d4b8",
    },
    {
      key: "shane" as ImageKey,
      src: shanePhoto,
      label: "Shane Suehr",
      accent: "#a87ef5",
    },
  ];

  return (
    <div>
      <p
        style={{
          fontSize: "12px",
          color: "rgba(232,237,248,0.45)",
          marginBottom: "12px",
          lineHeight: 1.5,
        }}
      >
        Red lines = crop boundaries. Match them for perfect alignment.
      </p>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        {images.map(({ key, src, label, accent }) => {
          const c = imageSettings[key];
          return (
            <div key={key}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: accent,
                  marginBottom: "6px",
                  textAlign: "center",
                }}
              >
                {label}
              </p>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: `${c.containerHeight}px`,
                  overflow: "hidden",
                  borderRadius: "10px",
                  border: `1px solid ${accent}30`,
                  maxHeight: "400px",
                }}
              >
                <img
                  src={src}
                  alt={label}
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
                    pointerEvents: "none",
                  }}
                />
                <svg
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 5,
                    opacity: 0.6,
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
                    strokeWidth="0.8"
                  />
                  <line
                    x1="0"
                    y1="300"
                    x2="100"
                    y2="300"
                    stroke="#ff6b6b"
                    strokeWidth="0.8"
                  />
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="300"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="0.4"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="150"
                    x2="100"
                    y2="150"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.3"
                    strokeDasharray="2 4"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  marginTop: "4px",
                  color: "rgba(232,237,248,0.3)",
                  fontFamily: "monospace",
                }}
              >
                Y:{c.posY}% · S:{c.scale} · H:{c.containerHeight}px
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Panel ────────────────────────────────────────────────────────────────

export default function SiteEditorPanel() {
  const [imageSettings, setImageSettings] = useState<
    Record<ImageKey, ImageConfig>
  >(() => getImageSettings());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() =>
    getSiteSettings(),
  );
  const [savedImg, setSavedImg] = useState(false);
  const [savedSite, setSavedSite] = useState(false);
  const [activeSection, setActiveSection] = useState<EditorSection>("images");

  // Listen for external changes
  useEffect(() => {
    const imgHandler = () => setImageSettings(getImageSettings());
    const siteHandler = () => setSiteSettings(getSiteSettings());
    window.addEventListener(IMAGE_EVENT, imgHandler);
    window.addEventListener(SITE_SETTINGS_EVENT, siteHandler);
    return () => {
      window.removeEventListener(IMAGE_EVENT, imgHandler);
      window.removeEventListener(SITE_SETTINGS_EVENT, siteHandler);
    };
  }, []);

  const handleImageChange = useCallback(
    (key: ImageKey, cfg: ImageConfig) => {
      const updated = { ...imageSettings, [key]: cfg };
      setImageSettings(updated);
      saveImageSettings(updated); // saves + broadcasts instantly
    },
    [imageSettings],
  );

  const handleSiteChange = useCallback(
    (partial: Partial<SiteSettings>) => {
      const updated = { ...siteSettings, ...partial };
      setSiteSettings(updated);
      saveSiteSettings(updated); // saves + broadcasts instantly
    },
    [siteSettings],
  );

  const handleSaveImages = () => {
    saveImageSettings(imageSettings);
    setSavedImg(true);
    setTimeout(() => setSavedImg(false), 2000);
  };

  const handleSaveSite = () => {
    saveSiteSettings(siteSettings);
    setSavedSite(true);
    setTimeout(() => setSavedSite(false), 2000);
  };

  const handleResetAll = () => {
    const defaults = { ...IMAGE_DEFAULTS };
    setImageSettings({
      mel: { ...defaults.mel },
      shane: { ...defaults.shane },
      logo: { ...defaults.logo },
    });
    saveImageSettings({
      mel: { ...defaults.mel },
      shane: { ...defaults.shane },
      logo: { ...defaults.logo },
    });
    setSiteSettings({ ...SITE_DEFAULTS });
    saveSiteSettings({ ...SITE_DEFAULTS });
  };

  const sections: {
    id: EditorSection;
    label: string;
    icon: React.ElementType;
    color: string;
  }[] = [
    { id: "images", label: "Images & Photos", icon: Grid3x3, color: "#ff8c42" },
    { id: "compare", label: "Alignment Check", icon: Move, color: "#00d4b8" },
    { id: "hero", label: "Hero Content", icon: Type, color: "#00d4b8" },
    { id: "about", label: "About / Founders", icon: Type, color: "#a87ef5" },
    { id: "contact", label: "Contact Info", icon: Type, color: "#ffc832" },
    { id: "colors", label: "Color Theme", icon: Palette, color: "#ff6b6b" },
  ];

  return (
    <div>
      {/* Panel Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#e8edf8",
              margin: 0,
            }}
          >
            Full-Site Visual Editor
          </h2>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(232,237,248,0.45)",
              marginTop: "4px",
            }}
          >
            Drag images to reposition · Edit any text · Adjust colors · All
            changes apply instantly to the live site.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleSaveImages}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              border: `1px solid ${savedImg ? "rgba(0,212,184,0.5)" : "rgba(0,212,184,0.25)"}`,
              backgroundColor: savedImg
                ? "rgba(0,212,184,0.12)"
                : "rgba(0,212,184,0.06)",
              color: "#00d4b8",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {savedImg ? <Check size={12} /> : <Save size={12} />}
            {savedImg ? "Images Saved!" : "Save Images"}
          </button>
          <button
            type="button"
            onClick={handleSaveSite}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              border: `1px solid ${savedSite ? "rgba(168,126,245,0.5)" : "rgba(168,126,245,0.25)"}`,
              backgroundColor: savedSite
                ? "rgba(168,126,245,0.12)"
                : "rgba(168,126,245,0.06)",
              color: "#a87ef5",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {savedSite ? <Check size={12} /> : <Save size={12} />}
            {savedSite ? "Content Saved!" : "Save Content"}
          </button>
          <button
            type="button"
            onClick={handleResetAll}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(255,107,107,0.2)",
              backgroundColor: "rgba(255,107,107,0.05)",
              color: "rgba(255,107,107,0.8)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RefreshCw size={12} />
            Reset All Defaults
          </button>
        </div>
      </div>

      {/* Instruction banner */}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          backgroundColor: "rgba(255,200,50,0.04)",
          border: "1px solid rgba(255,200,50,0.15)",
          marginBottom: "16px",
          fontSize: "12px",
          color: "rgba(232,237,248,0.6)",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#ffc832" }}>How to use:</strong> Click the
        preview image and drag to reposition the crop point in real time. Use
        the zoom slider to scale. All text fields update the live site instantly
        as you type. Changes persist across sessions.
      </div>

      {/* Section nav tabs */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              data-ocid={`admin.site_editor.${s.id}.tab`}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 12px",
                borderRadius: "8px",
                border: `1.5px solid ${isActive ? `${s.color}45` : "rgba(255,255,255,0.07)"}`,
                backgroundColor: isActive
                  ? `${s.color}12`
                  : "rgba(255,255,255,0.03)",
                color: isActive ? s.color : "rgba(232,237,248,0.5)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Icon size={12} />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── IMAGES SECTION ── */}
      {activeSection === "images" && (
        <div>
          <SectionCard
            title="Mel Kotchey — Headshot"
            icon={Grid3x3}
            accentColor="#00d4b8"
          >
            <DragImageEditor
              imageKey="mel"
              src={melPhoto}
              label="Mel Kotchey"
              accentColor="#00d4b8"
              config={imageSettings.mel}
              onChange={handleImageChange}
            />
          </SectionCard>

          <SectionCard
            title="Shane Suehr — Headshot"
            icon={Grid3x3}
            accentColor="#a87ef5"
          >
            <DragImageEditor
              imageKey="shane"
              src={shanePhoto}
              label="Shane Suehr"
              accentColor="#a87ef5"
              config={imageSettings.shane}
              onChange={handleImageChange}
            />
          </SectionCard>

          <SectionCard
            title="Cybin Logo"
            icon={Grid3x3}
            accentColor="#ffc832"
            defaultOpen={false}
          >
            <DragImageEditor
              imageKey="logo"
              src={logoPhoto}
              label="Logo"
              accentColor="#ffc832"
              config={imageSettings.logo}
              onChange={handleImageChange}
            />
          </SectionCard>
        </div>
      )}

      {/* ── ALIGNMENT COMPARE SECTION ── */}
      {activeSection === "compare" && (
        <SectionCard
          title="Side-by-Side Alignment Check"
          icon={Move}
          accentColor="#00d4b8"
        >
          <AlignmentPanel imageSettings={imageSettings} />
        </SectionCard>
      )}

      {/* ── HERO SECTION ── */}
      {activeSection === "hero" && (
        <SectionCard
          title="Homepage Hero Content"
          icon={Type}
          accentColor="#00d4b8"
        >
          <TextField
            label="Main Headline"
            value={siteSettings.hero.headline}
            onChange={(v) =>
              handleSiteChange({ hero: { ...siteSettings.hero, headline: v } })
            }
            multiline
          />
          <TextField
            label="Subheadline"
            value={siteSettings.hero.subheadline}
            onChange={(v) =>
              handleSiteChange({
                hero: { ...siteSettings.hero, subheadline: v },
              })
            }
            multiline
          />
          <TextField
            label="Body Text"
            value={siteSettings.hero.body}
            onChange={(v) =>
              handleSiteChange({ hero: { ...siteSettings.hero, body: v } })
            }
            multiline
          />
          <TextField
            label="Primary CTA Button Text"
            value={siteSettings.hero.primaryCta}
            onChange={(v) =>
              handleSiteChange({
                hero: { ...siteSettings.hero, primaryCta: v },
              })
            }
          />
          <TextField
            label="Secondary CTA Button Text"
            value={siteSettings.hero.secondaryCta}
            onChange={(v) =>
              handleSiteChange({
                hero: { ...siteSettings.hero, secondaryCta: v },
              })
            }
          />
        </SectionCard>
      )}

      {/* ── ABOUT SECTION ── */}
      {activeSection === "about" && (
        <div>
          <SectionCard
            title="Mission Statement"
            icon={Type}
            accentColor="#a87ef5"
          >
            <TextField
              label="Mission Title"
              value={siteSettings.about.missionTitle}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, missionTitle: v },
                })
              }
              accentColor="#a87ef5"
            />
            <TextField
              label="Mission Body Text"
              value={siteSettings.about.missionBody}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, missionBody: v },
                })
              }
              multiline
              accentColor="#a87ef5"
            />
            <TextField
              label="Founders Section Title"
              value={siteSettings.about.foundersSectionTitle}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, foundersSectionTitle: v },
                })
              }
              accentColor="#a87ef5"
            />
            <TextField
              label="Founders Section Subtitle"
              value={siteSettings.about.foundersSectionSubtitle}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, foundersSectionSubtitle: v },
                })
              }
              multiline
              accentColor="#a87ef5"
            />
          </SectionCard>

          <SectionCard
            title="Mel Kotchey — Bio"
            icon={Type}
            accentColor="#00d4b8"
          >
            <TextField
              label="Name"
              value={siteSettings.about.melName}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, melName: v },
                })
              }
            />
            <TextField
              label="Title"
              value={siteSettings.about.melTitle}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, melTitle: v },
                })
              }
            />
            <TextField
              label="Bio Paragraph 1"
              value={siteSettings.about.melBio1}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, melBio1: v },
                })
              }
              multiline
            />
            <TextField
              label="Bio Paragraph 2"
              value={siteSettings.about.melBio2}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, melBio2: v },
                })
              }
              multiline
            />
          </SectionCard>

          <SectionCard
            title="Shane Suehr — Bio"
            icon={Type}
            accentColor="#a87ef5"
          >
            <TextField
              label="Name"
              value={siteSettings.about.shaneName}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, shaneName: v },
                })
              }
              accentColor="#a87ef5"
            />
            <TextField
              label="Title"
              value={siteSettings.about.shaneTitle}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, shaneTitle: v },
                })
              }
              accentColor="#a87ef5"
            />
            <TextField
              label="Bio Paragraph 1"
              value={siteSettings.about.shaneBio1}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, shaneBio1: v },
                })
              }
              multiline
              accentColor="#a87ef5"
            />
            <TextField
              label="Bio Paragraph 2"
              value={siteSettings.about.shaneBio2}
              onChange={(v) =>
                handleSiteChange({
                  about: { ...siteSettings.about, shaneBio2: v },
                })
              }
              multiline
              accentColor="#a87ef5"
            />
          </SectionCard>
        </div>
      )}

      {/* ── CONTACT SECTION ── */}
      {activeSection === "contact" && (
        <SectionCard
          title="Contact Information"
          icon={Type}
          accentColor="#ffc832"
        >
          <TextField
            label="Mobile Phone Number"
            value={siteSettings.contact.phone1}
            onChange={(v) =>
              handleSiteChange({
                contact: { ...siteSettings.contact, phone1: v },
              })
            }
            accentColor="#ffc832"
          />
          <TextField
            label="Mobile Label (e.g. M)"
            value={siteSettings.contact.phone1Label}
            onChange={(v) =>
              handleSiteChange({
                contact: { ...siteSettings.contact, phone1Label: v },
              })
            }
            accentColor="#ffc832"
          />
          <TextField
            label="Office Phone Number"
            value={siteSettings.contact.phone2}
            onChange={(v) =>
              handleSiteChange({
                contact: { ...siteSettings.contact, phone2: v },
              })
            }
            accentColor="#ffc832"
          />
          <TextField
            label="Office Label (e.g. O)"
            value={siteSettings.contact.phone2Label}
            onChange={(v) =>
              handleSiteChange({
                contact: { ...siteSettings.contact, phone2Label: v },
              })
            }
            accentColor="#ffc832"
          />
          <TextField
            label="Email Address"
            value={siteSettings.contact.email}
            onChange={(v) =>
              handleSiteChange({
                contact: { ...siteSettings.contact, email: v },
              })
            }
            accentColor="#ffc832"
          />
        </SectionCard>
      )}

      {/* ── COLORS SECTION ── */}
      {activeSection === "colors" && (
        <SectionCard title="Color Theme" icon={Palette} accentColor="#ff6b6b">
          <p
            style={{
              fontSize: "12px",
              color: "rgba(232,237,248,0.45)",
              marginBottom: "14px",
              lineHeight: 1.5,
            }}
          >
            Changes apply instantly to the live site. Use standard hex codes
            (e.g. #00d4b8) or rgba() values.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <ColorSwatch
              label="Accent Teal"
              value={siteSettings.colors.accentTeal}
              onChange={(v) =>
                handleSiteChange({
                  colors: { ...siteSettings.colors, accentTeal: v },
                })
              }
            />
            <ColorSwatch
              label="Accent Purple"
              value={siteSettings.colors.accentPurple}
              onChange={(v) =>
                handleSiteChange({
                  colors: { ...siteSettings.colors, accentPurple: v },
                })
              }
            />
            <ColorSwatch
              label="Accent Gold"
              value={siteSettings.colors.accentGold}
              onChange={(v) =>
                handleSiteChange({
                  colors: { ...siteSettings.colors, accentGold: v },
                })
              }
            />
            <ColorSwatch
              label="Background Primary"
              value={siteSettings.colors.bgPrimary}
              onChange={(v) =>
                handleSiteChange({
                  colors: { ...siteSettings.colors, bgPrimary: v },
                })
              }
            />
            <ColorSwatch
              label="Background Secondary"
              value={siteSettings.colors.bgSecondary}
              onChange={(v) =>
                handleSiteChange({
                  colors: { ...siteSettings.colors, bgSecondary: v },
                })
              }
            />
            <ColorSwatch
              label="Text Primary"
              value={siteSettings.colors.textPrimary}
              onChange={(v) =>
                handleSiteChange({
                  colors: { ...siteSettings.colors, textPrimary: v },
                })
              }
            />
          </div>
        </SectionCard>
      )}
    </div>
  );
}
