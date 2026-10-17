export default function Hero() {
  return (
    <section className="scene-track hero-track" aria-labelledby="hero-title">
      <div className="scene-pin">
        <div className="scene-frame" aria-hidden="true">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/liquid-hero-mobile.webp" />
            <img src="/images/liquid-hero.webp" width="1664" height="936" alt="" fetchPriority="high" />
          </picture>
        </div>
      </div>
      <div className="hero-content">
        <p className="eyebrow"><span className="status-dot" /> Founder</p>
        <h1 id="hero-title">Abel Chin<span className="blue">.</span></h1>
        <p className="hero-position">Building in stealth.</p>
        <p className="hero-context">ex-NUS CS · ex-ASEAN scholar</p>
        <div className="hero-actions">
          <a className="button primary" href="#selected">Selected work <span aria-hidden="true">↓</span></a>
          <a className="button secondary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
        <p className="still-label">Liquid Lens · still image. Motion film pending.</p>
      </div>
    </section>
  );
}
