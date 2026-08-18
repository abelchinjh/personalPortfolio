import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

test("hero omits the three proof stats and MY to SG floating badge", () => {
  const home = read("src/pages/HomePage.tsx");
  assert.doesNotMatch(home, /className="hero-proof"/);
  assert.doesNotMatch(home, /className="floating-label label-place"/);
});

test("recognition restores the confirmed legacy 2022 awards", () => {
  const awards = read("src/data/awards.ts");
  assert.match(awards, /Champion/);
  assert.match(awards, /UNLEASH Hacks Singapore/);
  assert.match(awards, /Finalist/);
  assert.match(awards, /GGEF SDG Open Hack Singapore/);
  assert.equal((awards.match(/2022/g) ?? []).length, 2);
});

test("education section includes current SMU and prior NUS study", () => {
  const home = read("src/pages/HomePage.tsx");
  const education = read("src/data/education.ts");
  assert.match(home, /Education/);
  assert.match(home, /education\.map/);
  assert.match(education, /Singapore Management University/);
  assert.match(education, /Bachelor of Science in Computer Science/);
  assert.match(education, /Aug 2026/);
  assert.match(education, /SMU ASEAN Undergraduate Scholarship/);
  assert.match(education, /National University of Singapore/);
  assert.match(education, /B\.Comp\. \(Hons\.\) Computer Science/);
  assert.match(education, /Jul 2022/);
  assert.match(education, /Jan 2023/);
  assert.match(education, /pioneer batch of NUS College/);
});

test("requested education and organisation logos are local and wired into content", () => {
  const expected = [
    "public/brand-assets/nus.svg",
    "public/brand-assets/smu.png",
    "public/brand-assets/nyala-labs.svg",
    "public/brand-assets/generasi-gemilang.png",
    "public/brand-assets/imotorbike.svg",
  ];
  for (const asset of expected) assert.equal(existsSync(resolve(root, asset)), true, `${asset} should exist`);

  const education = read("src/data/education.ts");
  const leadership = read("src/data/leadership.ts");
  assert.match(education, /\/brand-assets\/smu\.png/);
  assert.match(education, /\/brand-assets\/nus\.svg/);
  assert.match(leadership, /\/brand-assets\/nyala-labs\.svg/);
  assert.match(leadership, /\/brand-assets\/generasi-gemilang\.png/);
  assert.match(leadership, /\/brand-assets\/imotorbike\.svg/);
});
