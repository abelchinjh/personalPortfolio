export default function Scene() {
  return (
    <section className="scene-track middle-track" aria-label="Liquid Lens, second composition">
      <div className="scene-pin">
        <div className="scene-frame" aria-hidden="true">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/liquid-middle-mobile.webp" />
            <img src="/images/liquid-middle.webp" width="1664" height="936" loading="lazy" alt="" />
          </picture>
        </div>
        <p className="scene-caption">Liquid Lens / 02 <span>Still image · motion film pending</span></p>
      </div>
    </section>
  );
}
