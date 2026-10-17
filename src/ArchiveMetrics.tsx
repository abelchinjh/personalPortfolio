import { useEffect, useRef, useState } from "react";
import { projects } from "./data/projects";
import { useMotionAllowed } from "./useMotionAllowed";

export const archiveMetrics = [
  { value: projects.length, label: "Project entries" },
  { value: projects.filter(p => p.repoUrl).length, label: "Entries with source links" },
  { value: projects.filter(p => p.featured).length, label: "Selected projects" },
];
function Metric({ value, label }: { value: number; label: string }) {
  const node = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const [display, setDisplay] = useState(value);
  const allowed = useMotionAllowed();
  useEffect(() => {
    if (!allowed || played.current || !window.IntersectionObserver) { setDisplay(value); return; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played.current) return;
      played.current = true;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1100, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    if (node.current) observer.observe(node.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); setDisplay(value); };
  }, [allowed, value]);
  return <div ref={node} className="metric" data-counter-target={value}>
    <span className="metric-number" aria-hidden="true">{display}</span>
    <span className="sr-only">{value} </span><span className="metric-label">{label}</span>
  </div>;
}
export default function ArchiveMetrics() {
  return <section className="section metrics-section" aria-labelledby="archive-metrics-title">
    <p className="eyebrow">The archive, in numbers</p>
    <h2 id="archive-metrics-title">A record of building<span className="blue">.</span></h2>
    <div className="metrics">{archiveMetrics.map(m => <Metric key={m.label} {...m} />)}</div>
    <p className="metric-note">Projects include prototypes, collaborations and competition work. Counts describe archive entries and source links.</p>
  </section>;
}
