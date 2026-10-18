import { useEffect, useState } from "react";
type Preference = "bright" | "dark" | "system";
const valid = (value: string | null): Preference => value === "bright" || value === "dark" ? value : "system";
function apply(preference: Preference) {
  const dark = preference === "dark" || (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "bright";
  document.documentElement.dataset.display = preference;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#101719" : "#f3f7f4");
}
export default function ThemeSelector() {
  const [preference, setPreference] = useState<Preference | null>(null);
  useEffect(() => {
    let stored: Preference = "system";
    try { stored = valid(localStorage.getItem("abel-display")); } catch { /* Use System. */ }
    setPreference(stored); apply(stored);
    const sync = (event: StorageEvent) => {
      if (event.key !== "abel-display" && event.key !== null) return;
      const choice = valid(event.newValue); setPreference(choice); apply(choice);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (preference === null) return;
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () => apply(preference);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [preference]);
  return <label className="theme-picker">
    <span className="sr-only">Display theme</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
    <select value={preference ?? "system"} onChange={event => {
      const choice = valid(event.target.value); setPreference(choice); apply(choice);
      try { if (choice === "system") localStorage.removeItem("abel-display"); else localStorage.setItem("abel-display", choice); } catch { /* The current page still updates without persistence. */ }
    }}>
      <option value="bright">Bright</option><option value="dark">Dark</option><option value="system">System</option>
    </select>
  </label>;
}
