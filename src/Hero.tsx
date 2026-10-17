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
        <h1 id="hero-title">A founder building himself</h1>
        <p className="hero-context">ex-NUS CS · ex-ASEAN scholar</p>
      </div>
    </section>
  );
}
