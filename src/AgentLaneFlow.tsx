import { useEffect, useRef, useState } from "react";
import { useMotionAllowed } from "./useMotionAllowed";
const stages = [
  { title: "Scoped mandate", detail: "A verified AI customer acts within explicit permissions." },
  { title: "Authoritative quote", detail: "The merchant supplies the price and terms to verify." },
  { title: "Payment evidence", detail: "XSGD payment evidence is checked on Avalanche." },
  { title: "Exactly-once order", detail: "An auditable order is created without duplication." },
];
export default function AgentLaneFlow() {
  const ref = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);
  const allowed = useMotionAllowed();
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!allowed) { setRunning(false); setActive(-1); return; }
    if (hasPlayed.current || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      hasPlayed.current = true; setActive(0); setRunning(true); observer.disconnect();
    }, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [allowed]);
  useEffect(() => {
    if (!running || !allowed) return;
    const timer = window.setTimeout(() => {
      if (active >= stages.length - 1) { setRunning(false); setActive(-1); }
      else setActive(n => n + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [active, running, allowed]);
  useEffect(() => {
    const stop = () => { if (document.hidden) setRunning(false); };
    document.addEventListener("visibilitychange", stop);
    return () => document.removeEventListener("visibilitychange", stop);
  }, []);
  return <section ref={ref} className="section agent-flow-section" aria-labelledby="flow-title">
    <div className="section-heading">
      <div><p className="eyebrow">Inside a selected project</p><h2 id="flow-title">Trust before an order<span className="blue">.</span></h2></div>
      <a className="text-link" href="https://github.com/abelchinjh/agentlane" target="_blank" rel="noreferrer">AgentLane source <span aria-hidden="true">↗</span></a>
    </div>
    <p className="flow-intro">AgentLane is a hackathon prototype for verified AI commerce. This illustration follows its mandate, quote, payment-evidence and order checks.</p>
    <ol className={`flow-stages${running ? " is-running" : ""}`}>
      {stages.map((s, i) => <li key={s.title} className={active === i ? "is-active" : ""} aria-current={active === i ? "step" : undefined}>
        <span className="flow-number" aria-hidden="true">0{i + 1}</span><h3>{s.title}</h3><p>{s.detail}</p>
      </li>)}
    </ol>
    <div className="flow-controls">
      {allowed && <button className="button secondary" type="button" onClick={() => {
        if (running) setRunning(false);
        else { setActive(0); setRunning(true); hasPlayed.current = true; }
      }}>{running ? "Pause flow" : "Replay flow"}</button>}
    </div>
  </section>;
}
