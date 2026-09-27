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

test("hero leads with prior NUS study and an accurate independent identity", () => {
  const home = read("src/pages/HomePage.tsx");
  const hero = home.split('<section className="hero-grid"')[1].split("</section>")[0];
  assert.match(hero, /National University of Singapore/);
  assert.match(hero, /Former student · ASEAN scholar/);
  assert.match(hero, /Computer Engineering and Computer Science at NUS/);
  assert.match(hero, /AI systems builder/);
  assert.ok(hero.indexOf("National University of Singapore") < hero.indexOf('<h1'));
  assert.doesNotMatch(hero, /SMU|Singapore Management|Currently|graduate|alumnus/);
});

test("experience omits SATS and closes Nyala in September 2026", () => {
  const leadership = read("src/data/leadership.ts");
  assert.doesNotMatch(leadership, /SATS|Incoming/);
  const nyala = leadership.split('title: "Nyala Labs"')[1].split("\n  },")[0];
  assert.match(nyala, /Oct 2025 – Sep 2026/);
  assert.match(nyala, /Founded and led/);
  assert.doesNotMatch(nyala, /present|Currently/);
  assert.match(leadership, /Generasi Gemilang/);
  assert.match(leadership, /iMotorbike/);
});

test("recognition restores the confirmed legacy 2022 awards", () => {
  const awards = read("src/data/awards.ts");
  assert.match(awards, /Champion/);
  assert.match(awards, /UNLEASH Hacks Singapore/);
  assert.match(awards, /Finalist/);
  assert.match(awards, /GGEF SDG Open Hack Singapore/);
  assert.match(awards, /UNLEASH Hacks Singapore[^\n]*2022/);
  assert.match(awards, /GGEF SDG Open Hack Singapore[^\n]*2022/);
});

test("education presents NUS honestly and retains both Victoria schools and scholarships", () => {
  const home = read("src/pages/HomePage.tsx");
  const education = read("src/data/education.ts");
  assert.match(home, /Education/);
  assert.match(home, /education\.map/);
  assert.match(education, /National University of Singapore/);
  assert.match(education, /Computer Engineering & Computer Science/);
  assert.match(education, /left after one semester without completing the degree/);
  assert.match(education, /pioneer batch of NUS College/);
  assert.match(education, /NUS ASEAN Undergraduate Merit Scholarship/);
  assert.match(education, /Victoria Junior College/);
  assert.match(education, /Victoria School/);
  assert.match(education, /Singapore-Cambridge GCE A-Level/);
  assert.match(education, /Singapore-Cambridge GCE O-Level/);
  assert.equal((education.match(/MOE Singapore ASEAN Scholarship/g) ?? []).length, 2);
  assert.doesNotMatch(education, /SMU|Singapore Management|B\.Comp|Bachelor/);
});

test("public biography and metadata remove SMU and SATS while retaining scholarship history", () => {
  const paths = ["src/pages/HomePage.tsx", "src/data/education.ts", "src/data/leadership.ts", "src/data/awards.ts", "index.html"];
  for (const path of paths) assert.doesNotMatch(read(path), /\bSMU\b|Singapore Management|\bSATS\b/, path);
  const awards = read("src/data/awards.ts");
  assert.match(awards, /NUS ASEAN Undergraduate Merit Scholarship/);
  assert.match(awards, /MOE Singapore ASEAN Scholarship/);
  assert.match(awards, /Victoria School & Victoria Junior College · 2018–2021/);
  assert.match(awards, /after Tuition Grant/);
  const html = read("index.html");
  assert.match(html, /former National University of Singapore student/);
  assert.doesNotMatch(html, /business student|Malaysia-first/);
});

test("requested education and organisation logos are local and wired into content", () => {
  const expected = [
    "public/brand-assets/nus.svg",

    "public/brand-assets/nyala-labs.svg",
    "public/brand-assets/generasi-gemilang-horizontal.png",
    "public/brand-assets/imotorbike.svg",
  ];
  for (const asset of expected) assert.equal(existsSync(resolve(root, asset)), true, `${asset} should exist`);

  const education = read("src/data/education.ts");
  const leadership = read("src/data/leadership.ts");
  assert.match(education, /\/brand-assets\/nus\.svg/);
  assert.match(leadership, /\/brand-assets\/nyala-labs\.svg/);
  assert.match(leadership, /\/brand-assets\/generasi-gemilang-horizontal\.png/);
  assert.match(leadership, /\/brand-assets\/imotorbike\.svg/);
});

test("wide education and organisation marks receive roomy contain-fit logo frames", () => {
  const styles = read("src/pages/Pages.css");
  assert.match(styles, /\.education-logo img[^}]*max-width:\s*220px/s);
  assert.match(styles, /\.timeline-logo[^}]*width:\s*168px[^}]*height:\s*64px/s);
  assert.match(styles, /\.timeline-logo img[^}]*object-fit:\s*contain/s);
});

test("work page presents the complete verified 29-project archive", () => {
  const page = read("src/pages/PortfolioPage.tsx");
  const projectData = read("src/data/projects.ts");
  const titleCount = (projectData.match(/^\s+title: "/gm) ?? []).length;

  assert.equal(titleCount, 29);
  assert.match(page, /Project archive · 2025—2026/);
  assert.doesNotMatch(page, /Selected work/);

  const requiredProjects = [
    "JalanLens",
    "ReliefKaki",
    "AgentLane",
    "Credence CorpSec Command Center",
    "Atlas Relay",
    "CatalogGym",
    "Mandai Go",
    "Okay Tak Okay",
    "My Life",
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
    "Alibaba Cloud × Atlas Agentic AI Hackathon",
    "LifeHack 2026",
    "AWS Kiro workshop",
    "ASEAN Data Science Explorers 2026 concept",
    "Private independent system",
    "SimplifyNext Agentic AI Hackathon 2026",
  ];
  for (const attribution of requiredAttributions) assert.match(projectData, new RegExp(attribution));

  assert.doesNotMatch(projectData, /github\.com\/abelcjh\//);
  assert.doesNotMatch(projectData, /abelcjh\.github\.io/);
  assert.match(projectData, /github\.com\/abelchinjh\/personalPortfolio/);
  assert.doesNotMatch(projectData, /tail0218a9|kira-hermes-vps|github\.com\/abelchinjh\/my_life/);
});

test("GOAI recognition preserves the Top 300 development-resource-support scope", () => {
  const awards = read("src/data/awards.ts");
  const award = awards.split("\n").find((line) => line.includes("GOAI"));
  assert.ok(award, "GOAI recognition should exist");
  assert.match(award, /title: "Top 300"/);
  assert.match(award, /Agent Infra · Development-resource support/);
  assert.match(award, /AgentProof OS/);
  const project = read("src/data/projects.ts").split('title: "AgentProof OS"')[1].split("\n  },")[0];
  assert.match(project, /Top 300 development-resource support/);
  assert.doesNotMatch(award + project, /ranked|winner|finalist|RMB|¥200/i);
});

test("SimplifyNext semi-finalist status appears in recognition and the JalanLens project", () => {
  const awards = read("src/data/awards.ts");
  const award = awards.split("\n").find((line) => line.includes("SimplifyNext"));
  assert.ok(award, "SimplifyNext recognition should exist");
  assert.match(award, /title: "Semi-finalist"/);
  assert.match(award, /SimplifyNext Agentic AI Hackathon · Physical AI · JalanLens Live Campus Guide · 2026/);
  const project = read("src/data/projects.ts").split('title: "JalanLens"')[1].split("\n  },")[0];
  assert.match(project, /SimplifyNext Agentic AI Hackathon 2026 \(semi-finalist\)/);
  assert.match(project, /simulated Unitree Go2/);
});

test("recognition numbering uses two digits even when there are ten entries", () => {
  const home = read("src/pages/HomePage.tsx");
  const recognition = home.split('<div className="recognition-list">')[1].split("</section>")[0];
  assert.match(recognition, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
});

test("Vercel serves React Router deep links through the SPA entry point", () => {
  const config = JSON.parse(read("vercel.json"));
  assert.deepEqual(config.rewrites, [
    { source: "/(.*)", destination: "/index.html" },
  ]);
});
