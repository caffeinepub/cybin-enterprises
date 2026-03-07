/**
 * useLiveSiteSettings — React hook that subscribes to site settings changes
 * and re-renders consumers whenever the admin panel saves new values.
 */
import { useEffect, useState } from "react";
import {
  SITE_SETTINGS_EVENT,
  type SiteSettings,
  getSiteSettings,
} from "./useSiteSettings";

export function useLiveSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    getSiteSettings(),
  );

  useEffect(() => {
    const handler = () => setSettings(getSiteSettings());
    window.addEventListener(SITE_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(SITE_SETTINGS_EVENT, handler);
  }, []);

  return settings;
}
