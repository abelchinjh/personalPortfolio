export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Credence CorpSec Command Center",
    eyebrow: "Malaysia-first compliance-tech",
    description: "A workflow command centre exploring how AI-assisted operations can make corporate-secretarial work more reliable, transparent and scalable for Malaysian SMEs and service providers.",
    tags: ["React", "TypeScript", "Supabase", "AI agents"],
    repoUrl: "https://github.com/abelcjh/qoder-corpsec-command-center",
    featured: true,
  },
  {
    title: "CareKaki Bridge",
    eyebrow: "Social-impact platform",
    description: "A silent-help task marketplace designed to connect male caregivers with student volunteers for practical support, dignity and community connection.",
    tags: ["Product design", "Full stack", "Social impact"],
    repoUrl: "https://github.com/abelcjh/carekaki-bridge",
    featured: true,
  },
  {
    title: "AgentProof OS",
    eyebrow: "Agent infrastructure",
    description: "Verifiable execution receipts for multi-agent workflows, built around the question of how autonomous systems can show their work and earn trust.",
    tags: ["Multi-agent systems", "Python", "Evaluation"],
    repoUrl: "https://github.com/abelcjh/agentproof-os",
  },
  {
    title: "GreenFlow ASEAN",
    eyebrow: "Climate-finance prototype",
    description: "An ASEAN SME climate-finance prototype created for the ASEAN DSE 2026, making climate action more legible for growing businesses.",
    tags: ["React", "Fintech", "Climate"],
    repoUrl: "https://github.com/abelcjh/greenflow-asean",
    liveUrl: "https://abelcjh.github.io/greenflow-asean/",
    liveLabel: "View site",
  },
  {
    title: "VoiceBridge",
    eyebrow: "Disaster-response communication",
    description: "An AI communication platform combining speech-to-text, translation, text-to-speech and reporting for multilingual ASEAN disaster-response settings.",
    tags: ["React Native", "Speech AI", "Supabase"],
    repoUrl: "https://github.com/pangtengg/borneohack",
    liveUrl: "https://youtu.be/9AA6Z2woAgk",
    liveLabel: "Watch demo",
  },
  {
    title: "MayaShield",
    eyebrow: "Anti-scam mobile app",
    description: "A scam-call safety concept that detects suspicious calls in real time and turns community reports into signals that can protect others.",
    tags: ["Flutter", "Gemini", "Firebase"],
    repoUrl: "https://github.com/abelcjh/kitahack2026",
    liveUrl: "https://www.youtube.com/watch?v=7UnJo-vcJC0",
    liveLabel: "Watch demo",
  },
];
