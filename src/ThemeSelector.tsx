import { useEffect, useId, useRef, useState } from "react";
type Preference = "bright" | "dark" | "system";
const preferences: Preference[] = ["bright", "dark", "system"];
const labels = { bright: "Bright", dark: "Dark", system: "System" };
const valid = (value: string | null): Preference => value === "bright" || value === "dark" ? value : "system";
function apply(preference: Preference) {
  const dark = preference === "dark" || (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "bright";
  document.documentElement.dataset.display = preference;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#101719" : "#f3f7f4");
}
function ThemeIcon({ preference }: { preference: Preference }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-theme-icon={preference}>
    {preference === "bright" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : preference === "dark" ? <path d="M20.5 14.5A9 9 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z" /> : <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>}
  </svg>;
}
export default function ThemeSelector() {
  const [preference, setPreference] = useState<Preference | null>(null);
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const currentButton = useRef<HTMLButtonElement>(null);
  const optionsId = useId();
  const current = preference ?? "system";
  const others = preferences.filter(value => value !== current);
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
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);
  const focus = (index: number) => requestAnimationFrame(() => container.current?.querySelectorAll<HTMLButtonElement>("button")[index]?.focus());
  const choose = (choice: Preference) => {
    setPreference(choice); apply(choice); setOpen(false);
    try { if (choice === "system") localStorage.removeItem("abel-display"); else localStorage.setItem("abel-display", choice); } catch { /* The current page still updates without persistence. */ }
    currentButton.current?.focus();
  };
  return <div className="theme-picker" role="group" aria-label="Display preference" ref={container}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); currentButton.current?.focus(); return; }
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
      if (!open) { setOpen(true); focus(event.key === "Home" ? 0 : backward || event.key === "End" ? 2 : 1); return; }
      const buttons = [...event.currentTarget.querySelectorAll("button")];
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      focus(event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (backward ? -1 : 1) + 3) % 3);
    }}>
    <button ref={currentButton} className="theme-icon theme-current" type="button" aria-label={`Display theme: ${labels[current]}`} title={`${labels[current]} theme — change display`}
      aria-expanded={open} aria-controls={optionsId} aria-pressed="true" onClick={() => setOpen(value => !value)}><ThemeIcon preference={current} /></button>
    <span id={optionsId} className="theme-options" hidden={!open} role="group" aria-label="Other display themes">
      {others.map(value => <button key={value} className="theme-icon" type="button" aria-label={`Use ${labels[value]} theme`} title={`${labels[value]} theme`} aria-pressed="false" onClick={() => choose(value)}><ThemeIcon preference={value} /></button>)}
    </span>
  </div>;
}
