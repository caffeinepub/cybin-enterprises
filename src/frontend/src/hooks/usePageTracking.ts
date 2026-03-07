/**
 * usePageTracking — Privacy-first page view tracking using localStorage only.
 * No PII is collected. Events are stored in 'cybin-analytics-events'.
 */
import { useLocation } from "@/lib/router";
import { useEffect } from "react";

export const ANALYTICS_KEY = "cybin-analytics-events";

export interface AnalyticsEvent {
  path: string;
  timestamp: number;
  deviceType: "mobile" | "tablet" | "desktop";
  referrer: string;
  sessionId: string;
}

function getDeviceType(): AnalyticsEvent["deviceType"] {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (
    /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
      ua,
    )
  )
    return "mobile";
  return "desktop";
}

function getOrCreateSessionId(): string {
  let sid = sessionStorage.getItem("cybin-session-id");
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("cybin-session-id", sid);
  }
  return sid;
}

export function trackPageView(path: string) {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.push({
      path,
      timestamp: Date.now(),
      deviceType: getDeviceType(),
      referrer: document.referrer || "(direct)",
      sessionId: getOrCreateSessionId(),
    });
    // Keep last 5000 events to avoid localStorage overflow
    const trimmed = events.slice(-5000);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
}
