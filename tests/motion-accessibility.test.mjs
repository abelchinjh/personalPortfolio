import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
test("initial HTML is static, with explicit user motion activation", () => {
  const html = read("dist/index.html");
  assert.match(html, /aria-pressed="false"/);
  assert.match(html, /Play light motion/);
  assert.doesNotMatch(html, /<video|class="hero motion-on"/);
  assert.match(read("src/index.css"), /prefers-reduced-motion:\s*reduce/);
});
test("search is labeled and result updates have an accessible status", () => {
  const html = read("dist/portfolio/index.html");
  assert.match(html, /<label for="project-search">Search projects/);
  assert.match(html, /role="status"/);
  assert.match(html, /29<!-- --> of <!-- -->29/);
});
