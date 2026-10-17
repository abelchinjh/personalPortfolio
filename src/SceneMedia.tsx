import { useEffect, useRef, useState } from "react";
import { useMotionAllowed } from "./useMotionAllowed";

/** Video URLs are attached only after motion/data preferences and proximity allow it. */
export default function SceneMedia({ scene, eager = false }: { scene: "hero" | "middle"; eager?: boolean }) {
  const allowed = useMotionAllowed();
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const query = matchMedia("(max-width: 640px)");
    const update = () => { setMobile(query.matches); setReady(false); };
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!allowed || !frame.current || !window.IntersectionObserver) { setNear(false); return; }
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: "150px" });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, [allowed]);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const update = () => {
      if (!allowed || !near || paused || document.hidden) media.pause();
      else media.play().then(() => setReady(media.readyState >= 2)).catch((error: DOMException) => { if (error.name !== "AbortError") { setReady(false); setPaused(true); } });
    };
    update(); document.addEventListener("visibilitychange", update);
    return () => { document.removeEventListener("visibilitychange", update); media.pause(); };
  }, [allowed, near, paused, mobile]);
  const load = allowed && near && !failed;
  const name = `liquid-${scene}${mobile ? "-mobile" : ""}`;
  return <div ref={frame} className="scene-frame">
    <picture aria-hidden="true">
      <source media="(max-width: 640px)" srcSet={`/images/liquid-${scene}-3d-mobile.webp`} />
      <img src={`/images/liquid-${scene}-3d.webp`} width="1280" height="720" alt="" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />
    </picture>
    {load && <video key={name} ref={video} className={ready ? "scene-video is-ready" : "scene-video"} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
      poster={`/images/liquid-${scene}-3d${mobile ? "-mobile" : ""}.webp`}
      onLoadedData={() => { setReady(true); if (!paused && !document.hidden) video.current?.play().catch((error: DOMException) => { if (error.name !== "AbortError") setPaused(true); }); }}
      onError={() => { setFailed(true); setReady(false); }}>
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>}
    {load && <button className="scene-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={`${paused ? "Play" : "Pause"} ${scene} animation`}>{paused ? "Play animation" : "Pause animation"}</button>}
  </div>;
}
