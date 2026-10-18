import SceneMedia from "./SceneMedia";
export default function Hero() {
  return (
    <section className="scene-track hero-track" aria-labelledby="hero-title">
      <div className="scene-pin">
        <SceneMedia scene="hero" eager />
      </div>
      <div className="hero-content">
        <h1 id="hero-title">A founder building in <span className="hero-last-line">stealth</span></h1>
        <p className="hero-context">ex-NUS CS · ex-ASEAN scholar</p>
      </div>
    </section>
  );
}
