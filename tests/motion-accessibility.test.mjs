import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const motionSource = readFileSync(new URL("../src/MotionLayer.tsx", import.meta.url), "utf8");
const pagesCss = readFileSync(new URL("../src/pages/Pages.css", import.meta.url), "utf8");

test("canvas reacts to reduced-motion preference changes after mount", () => {
  assert.match(motionSource, /addEventListener\("change",\s*onReducedMotionChange\)/);
  assert.match(motionSource, /removeEventListener\("change",\s*onReducedMotionChange\)/);

  const handler = motionSource.match(
    /const onReducedMotionChange = \(event: MediaQueryListEvent\) => \{([\s\S]*?)\n    \};/,
  )?.[1];
  assert.ok(handler, "reduced-motion change handler should exist");
  assert.match(handler, /reducedMotion = event\.matches/);
  assert.match(handler, /cancelAnimationFrame\(frame\)/);
  assert.match(handler, /draw\(\)/);

  const resizeHandler = motionSource.match(/const resize = \(\) => \{([\s\S]*?)\n    \};/)?.[1];
  assert.ok(resizeHandler, "resize handler should exist");
  assert.match(resizeHandler, /if \(reducedMotion\) draw\(\)/);
});

test("contact motif rotates without replacing its vertical centering transform", () => {
  assert.match(pagesCss, /\.contact-motif\s*\{[^}]*animation:\s*contact-orbit-spin/s);
  assert.match(
    pagesCss,
    /@keyframes\s+contact-orbit-spin\s*\{[^}]*translateY\(-50%\)[^}]*\}[^}]*translateY\(-50%\)/s,
  );
});

test("revealed offset cards retain hover motion on desktop and mobile", () => {
  assert.match(
    pagesCss,
    /\.card-1\[data-reveal\]\.is-visible:hover\s*\{[^}]*translateY\(calc\(1\.8rem - 8px\)\)[^}]*rotate\(\.25deg\)/s,
  );
  assert.match(
    pagesCss,
    /\.card-4\[data-reveal\]\.is-visible:hover\s*\{[^}]*translateY\(calc\(-1\.8rem - 8px\)\)[^}]*rotate\(\.25deg\)/s,
  );
  assert.match(
    pagesCss,
    /@media \(max-width: 720px\)[\s\S]*\.card-1\[data-reveal\]\.is-visible:hover[^}]*transform:\s*translateY\(-5px\)/s,
  );
});
