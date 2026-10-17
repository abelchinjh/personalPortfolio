import { useEffect, useRef, useState } from "react";
export default function Hero() {
  const [motion, setMotion] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => {
      setReduced(preference.matches);
      if (preference.matches) setMotion(false);
    };
    const hidden = () => {
      if (document.hidden) setMotion(false);
    };
    changed();
    preference.addEventListener("change", changed);
    document.addEventListener("visibilitychange", hidden);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setMotion(false);
    });
    if (hero.current) observer.observe(hero.current);
    return () => {
      preference.removeEventListener("change", changed);
      document.removeEventListener("visibilitychange", hidden);
      observer.disconnect();
    };
  }, []);
  return (
    <section
      ref={hero}
      className={`hero ${motion && visible && !reduced ? "motion-on" : ""}`}
      aria-labelledby="hero-title"
    >
      <picture className="hero-art">
        <source
          media="(max-width: 640px)"
          srcSet="/images/architecture-mobile.webp"
        />
        <img
          src="/images/architecture-1280.webp"
          srcSet="/images/architecture-1280.webp 1280w, /images/architecture-1920.webp 1920w"
          sizes="100vw"
          width="1920"
          height="1080"
          alt=""
          fetchPriority="high"
        />
      </picture>
      <div className="light-sweep" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">
          <span className="status-dot" /> TECHNICAL FOUNDER
        </p>
        <h1 id="hero-title">
          Abel Chin<span className="blue">.</span>
          <span className="hero-position">
            Building
            <br />
            in stealth.
          </span>
        </h1>
        <p className="hero-context">Ex-NUS CS · Former ASEAN Scholar.</p>
        <div className="hero-actions">
          <a className="button primary" href="#selected">
            View selected work <span aria-hidden="true">↓</span>
          </a>
          <a className="button secondary" href="#contact">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <span>PUBLIC WORK. PRIVATE AMBITION.</span>
        <button
          type="button"
          className="motion-control"
          aria-pressed={motion}
          disabled={reduced}
          onClick={() => setMotion(!motion)}
        >
          {reduced
            ? "Reduced motion enabled"
            : motion
              ? "Pause light motion"
              : "Play light motion"}
          <span aria-hidden="true"> {motion ? "Ⅱ" : "▷"}</span>
        </button>
      </div>
    </section>
  );
}
