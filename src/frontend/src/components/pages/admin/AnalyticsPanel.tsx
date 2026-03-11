import { ANALYTICS_KEY, type AnalyticsEvent } from "@/hooks/usePageTracking";
import { BarChart2, Monitor, Smartphone, Tablet, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

function loadEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getUniqueSessionCount(events: AnalyticsEvent[]): number {
  return new Set(events.map((e) => e.sessionId)).size;
}

function getTopPages(
  events: AnalyticsEvent[],
  n = 5,
): { path: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.path] = (counts[e.path] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([path, count]) => ({ path, count }));
}

function getDeviceBreakdown(events: AnalyticsEvent[]): Record<string, number> {
  const counts: Record<string, number> = {
    desktop: 0,
    mobile: 0,
    tablet: 0,
  };
  for (const e of events) {
    counts[e.deviceType] = (counts[e.deviceType] ?? 0) + 1;
  }
  return counts;
}

function getLast7DaysData(
  events: AnalyticsEvent[],
): { day: string; count: number }[] {
  const now = Date.now();
  const days: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000);
    const label = d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const count = events.filter((e) => {
      const ed = new Date(e.timestamp);
      return (
        ed.getFullYear() === d.getFullYear() &&
        ed.getMonth() === d.getMonth() &&
        ed.getDate() === d.getDate()
      );
    }).length;
    days.push({ day: label, count });
  }
  return days;
}

export default function AnalyticsPanel() {
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => loadEvents());
  const [cleared, setCleared] = useState(false);

  const refresh = useCallback(() => {
    setEvents(loadEvents());
    setCleared(false);
  }, []);

  const handleClear = () => {
    localStorage.removeItem(ANALYTICS_KEY);
    setEvents([]);
    setCleared(true);
  };

  const totalViews = events.length;
  const uniqueSessions = getUniqueSessionCount(events);
  const topPages = getTopPages(events);
  const deviceBreakdown = getDeviceBreakdown(events);
  const last7Days = getLast7DaysData(events);
  const maxDay = Math.max(...last7Days.map((d) => d.count), 1);
  const maxTopPage = Math.max(...topPages.map((p) => p.count), 1);

  const deviceIcons = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet,
  };

  const deviceColors = {
    desktop: "#00d4b8",
    mobile: "#a87ef5",
    tablet: "#ffc832",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
          >
            Analytics
          </h2>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(232,237,248,0.35)" }}
          >
            Privacy-first · Data stored locally in this browser · No PII
            collected
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid="analytics.refresh.button"
            onClick={refresh}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: "rgba(110,247,212,0.08)",
              border: "1px solid rgba(110,247,212,0.2)",
              color: "#00d4b8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(110,247,212,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(110,247,212,0.08)";
            }}
          >
            Refresh
          </button>
          <button
            type="button"
            data-ocid="analytics.clear.delete_button"
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: "rgba(255,107,107,0.08)",
              border: "1px solid rgba(255,107,107,0.2)",
              color: "#ff6b6b",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,107,107,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,107,107,0.08)";
            }}
          >
            <Trash2 size={13} />
            Clear Data
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: "rgba(110,247,212,0.03)",
          border: "1px solid rgba(110,247,212,0.1)",
        }}
      >
        <p
          className="text-xs leading-relaxed"
          style={{ color: "rgba(232,237,248,0.45)" }}
        >
          <strong style={{ color: "#00d4b8" }}>Privacy-first analytics:</strong>{" "}
          All data is stored exclusively in{" "}
          <code style={{ color: "#00d4b8" }}>localStorage</code> on{" "}
          <em>this browser</em> and never sent to any server. No personally
          identifiable information (PII) is collected — only page paths,
          timestamps, device type, and session identifiers. Data is cleared when
          you click "Clear Data" or when the user clears browser storage.
        </p>
      </div>

      {cleared && (
        <div
          data-ocid="analytics.cleared.success_state"
          className="rounded-xl p-4 text-center"
          style={{
            backgroundColor: "rgba(110,247,212,0.06)",
            border: "1px solid rgba(110,247,212,0.2)",
          }}
        >
          <p className="text-sm" style={{ color: "#00d4b8" }}>
            Analytics data cleared successfully.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Page Views", value: totalViews, color: "#00d4b8" },
          { label: "Unique Sessions", value: uniqueSessions, color: "#a87ef5" },
          {
            label: "Pages Tracked",
            value: new Set(events.map((e) => e.path)).size,
            color: "#ffc832",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{
              backgroundColor: `${color}08`,
              border: `1px solid ${color}20`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: `${color}cc` }}
            >
              {label}
            </p>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last 7 Days Bar Chart */}
        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={15} style={{ color: "#00d4b8" }} />
            <h3 className="text-sm font-semibold" style={{ color: "#e8edf8" }}>
              Last 7 Days
            </h3>
          </div>
          <div
            className="flex items-end gap-2 h-32"
            data-ocid="analytics.chart.canvas_target"
          >
            {last7Days.map(({ day, count }) => (
              <div
                key={day}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: "rgba(232,237,248,0.5)" }}
                >
                  {count}
                </span>
                <div
                  className="w-full rounded-t transition-all"
                  style={{
                    height: `${Math.max(4, (count / maxDay) * 100)}px`,
                    backgroundColor: "#00d4b8",
                    opacity: count === 0 ? 0.2 : 0.8,
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: "rgba(232,237,248,0.3)",
                    fontSize: "10px",
                    textAlign: "center",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {day.split(",")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h3
            className="text-sm font-semibold mb-5"
            style={{ color: "#e8edf8" }}
          >
            Device Breakdown
          </h3>
          <div className="space-y-4">
            {(["desktop", "mobile", "tablet"] as const).map((type) => {
              const Icon = deviceIcons[type];
              const color = deviceColors[type];
              const count = deviceBreakdown[type] ?? 0;
              const pct =
                totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
              return (
                <div key={type} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}14` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-semibold capitalize"
                        style={{ color: "rgba(232,237,248,0.7)" }}
                      >
                        {type}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(232,237,248,0.4)" }}
                      >
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Pages Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h3 className="text-sm font-semibold" style={{ color: "#e8edf8" }}>
            Top 5 Pages
          </h3>
        </div>
        {topPages.length === 0 ? (
          <div
            className="text-center py-12"
            data-ocid="analytics.pages.empty_state"
          >
            <p className="text-sm" style={{ color: "rgba(232,237,248,0.3)" }}>
              No page views tracked in this browser yet.
            </p>
          </div>
        ) : (
          <div data-ocid="analytics.pages.table">
            {topPages.map(({ path, count }, i) => {
              const pct = Math.round((count / maxTopPage) * 100);
              return (
                <div
                  key={path}
                  data-ocid={`analytics.pages.row.${i + 1}`}
                  className="flex items-center gap-4 px-5 py-3"
                  style={{
                    borderBottom:
                      i < topPages.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <span
                    className="text-xs font-bold w-5 text-center flex-shrink-0"
                    style={{ color: "rgba(232,237,248,0.3)" }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <code className="text-xs" style={{ color: "#00d4b8" }}>
                      {path}
                    </code>
                    <div
                      className="h-1 rounded-full mt-1.5 overflow-hidden"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: "#00d4b8",
                          opacity: 0.6,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    className="text-sm font-semibold flex-shrink-0"
                    style={{ color: "rgba(232,237,248,0.7)" }}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
