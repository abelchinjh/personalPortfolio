import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number;
};

const palette = ["#ff806f", "#f7c967", "#65e4b3", "#6ed8e7", "#b59aff"];

export default function MotionLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000 };
    let reducedMotion = motionPreference.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let particles: Particle[] = [];

    const buildParticles = () => {
      const count = width < 700 ? 24 : 48;
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: 0.8 + Math.random() * 1.8,
        color: palette[index % palette.length],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildParticles();
      if (reducedMotion) draw();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        if (!reducedMotion) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 180 && distance > 0) {
            particle.vx -= (dx / distance) * 0.0025;
            particle.vy -= (dy / distance) * 0.0025;
          }
          particle.vx *= 0.998;
          particle.vy *= 0.998;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -20) particle.x = width + 20;
          if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          if (particle.y > height + 20) particle.y = -20;
        }

        for (let peerIndex = index + 1; peerIndex < particles.length; peerIndex += 1) {
          const peer = particles[peerIndex];
          const distance = Math.hypot(particle.x - peer.x, particle.y - peer.y);
          if (distance < 125) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(peer.x, peer.y);
            context.strokeStyle = `rgba(181, 154, 255, ${0.055 * (1 - distance / 125)})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        const pulse = reducedMotion ? 1 : 0.75 + Math.sin(time * 0.001 + particle.phase) * 0.25;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = 0.3;
        context.fill();
        context.globalAlpha = 1;
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(frame);
      frame = 0;
      draw();
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    motionPreference.addEventListener("change", onReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      motionPreference.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="motion-canvas" aria-hidden="true" />;
}
