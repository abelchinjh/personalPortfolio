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

test("work page presents the complete verified 24-project archive", () => {
  const page = read("src/pages/PortfolioPage.tsx");
  const projectData = read("src/data/projects.ts");
  const titleCount = (projectData.match(/^\s+title: "/gm) ?? []).length;

  assert.equal(titleCount, 24);
  assert.match(page, /Project archive · 2025—2026/);
  assert.doesNotMatch(page, /Selected work/);

  const requiredProjects = [
    "JalanLens",
    "ReliefKaki",
    "AgentLane",
    "Credence CorpSec Command Center",
    "AgentProof OS",
    "BorderProof SG",
    "BunkerPilot",
    "GreenFlow ASEAN",
    "SkillBridge SG",
    "Anime Derby",
    "Invoice Register Agent",
    "ForkCast",
    "VoiceBridge",
    "MayaShield",
    "Hashtag Trend Classifier",
    "RostalQ",
    "UniFriend",
    "ImpactHub",
    "Ghosted",
    "AktaLens",
    "Nyala Neural Forge",
    "Nyala Orbit Defender",
    "Nyala Signal Runner",
    "Personal Portfolio",
  ];
  for (const title of requiredProjects) assert.match(projectData, new RegExp(`title: "${title}"`));
});

test("project entries identify their verified hackathon or programme without stale GitHub usernames", () => {
  const projectData = read("src/data/projects.ts");
  const requiredAttributions = [
    "Huawei Tech4City Competition 2026",
    "SparkX\\+Change × Alexandra Hospital",
    "StraitsX AgentiX Playground Hackathon 2026",
    "Alibaba Cloud × Qoder Hackathon Singapore 2026",
    "GOAI Global Open-source AI Challenge",
    "AI Tinkerers × Tencent Cloud Agent Development Challenge",
    "MaritimeONE Case Summit 2026",
    "ASEAN Data Science Explorers 2026",
    "PyCon Singapore 2026",
    "GrowthX World’s Largest Hermes Buildathon",
    "January Capital × OpenAI × Jelawang Capital Builders Session",
    "GMI Cloud × Z.ai Hackathon Singapore 2026",
    "BorNEO HackWknd 2026",
    "KitaHack 2026",
    "L’Oréal × Monash Datathon 2025",
    "AWS Great Malaysia AI Hackathon 2025",
    "Building for Good · Lovable",
    "Cursor × Anthropic Hackathon Malaysia 2025",
    "NUS Hack&Roll 2026",
    "Nyala Labs × SunFest 2026",
  ];
  for (const attribution of requiredAttributions) assert.match(projectData, new RegExp(attribution));

  assert.doesNotMatch(projectData, /github\.com\/abelcjh\//);
  assert.doesNotMatch(projectData, /abelcjh\.github\.io/);
  assert.match(projectData, /github\.com\/abelchinjh\/personalPortfolio/);
});

test("Vercel serves React Router deep links through the SPA entry point", () => {
  const config = JSON.parse(read("vercel.json"));
  assert.deepEqual(config.rewrites, [
    { source: "/(.*)", destination: "/index.html" },
  ]);
});
