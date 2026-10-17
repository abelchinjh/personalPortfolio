import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const home = read("dist/index.html");
const archive = read("dist/portfolio/index.html");
test("both pre-rendered routes expose identity and contacts without JavaScript", () => {
  assert.match(home, /Building<br\/>in stealth/);
  assert.match(home, /Ex-NUS CS/);
  assert.match(home, /Former ASEAN Scholar/);
  for (const html of [home, archive]) {
    for (const link of [
      "mailto:hello@abelchinjh.com",
      "https://github.com/abelchinjh",
      "https://x.com/@abelchinjh",
      "https://discordapp.com/users/1334801780273315870",
    ])
      assert.ok(html.includes(link), link);
    assert.doesNotMatch(html, /linkedin\.com|Building in public/);
    assert.match(html, /Skip to content/);
    assert.match(html, /<main id="main" tabindex="-1"/);
  }
});
test("all original 29 project entries are present in initial archive HTML", () => {
  const titles = [
    ...read("src/data/projects.ts").matchAll(/^    title: "(.*)",$/gm),
  ].map((m) => m[1]);
  assert.equal(titles.length, 29);
  assert.equal((archive.match(/class="project-row"/g) || []).length, 29);
  for (const title of titles)
    assert.ok(archive.includes(title.replaceAll("&", "&amp;")), title);
  assert.match(archive, /Open original UniFriend screenshot 1/);
});
test("education qualifications and source graphics remain available", () => {
  assert.match(home, /without completing the degree/);
  assert.match(home, /pioneer batch of NUS College/);
  for (const asset of [
    "public/UniFriend1.png",
    "public/UniFriend2.png",
    "public/UniFriend3.png",
    "public/AbelChinPhoto20260321.jpg",
    "public/fonts/OFL-Manrope.txt",
  ])
    assert.ok(existsSync(new URL("../" + asset, import.meta.url)), asset);
});
test("refined favicon is native geometry and all export sizes exist", () => {
  assert.doesNotMatch(
    read("public/favicon.svg"),
    /<image|<text|filter|http[^:]*:\/\/(?!www.w3.org)/,
  );
  for (const size of [16, 32]) {
    const png = readFileSync(
      new URL(`../public/favicon-${size}.png`, import.meta.url),
    );
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});
