/* Runs before styles: stored explicit choice wins; otherwise follow the OS. */
(() => {
  let preference = "system";
  try {
    const stored = localStorage.getItem("abel-display");
    if (stored === "bright" || stored === "dark") preference = stored;
  } catch { /* Storage may be unavailable; System still works. */ }
  const dark = preference === "dark" || (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "bright";
  document.documentElement.dataset.display = preference;
})();
