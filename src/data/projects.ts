export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  accent: string;
  repoUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "JalanLens",
    eyebrow: "Tech4City · major contributor",
    description: "A Clementi accessibility digital twin combining real satellite imagery, Mapillary street views, public feedback and persona agents to help residents and authorities understand how different people experience each footpath.",
    tags: ["Geospatial", "Supabase", "Computer vision", "Accessibility"],
    accent: "#f7c967",
    repoUrl: "https://github.com/DennieDan/equiroute-data",
    featured: true,
  },
  {
    title: "ReliefKaki",
    eyebrow: "Caregiver respite · social impact",
    description: "A high-trust activation layer that helps male caregivers ask for bounded, non-clinical support from verified student volunteers while hospital partners retain safety and completion controls.",
    tags: ["React", "TypeScript", "Trust & safety", "Service design"],
    accent: "#ff806f",
    repoUrl: "https://github.com/abelchinjh/reliefkaki",
    liveUrl: "https://abelchinjh.github.io/reliefkaki/",
    liveLabel: "Open prototype",
    featured: true,
  },
  {
    title: "AgentLane",
    eyebrow: "AI-native commerce infrastructure",
    description: "A trust-first merchant gateway for verified AI customers, with scoped mandates, authoritative quotes, XSGD payment evidence on Avalanche and auditable, exactly-once order creation.",
    tags: ["TypeScript", "MCP", "Avalanche", "XSGD"],
    accent: "#65e4b3",
    repoUrl: "https://github.com/abelchinjh/agentlane",
    featured: true,
  },
  {
    title: "Credence CorpSec Command Center",
    eyebrow: "Malaysia-first compliance technology",
    description: "An AI-assisted workflow cockpit for Malaysian corporate-secretarial practices, turning statutory deadlines into scoped reminders, scheduled jobs and reviewer-ready evidence receipts.",
    tags: ["React", "TypeScript", "Supabase", "AI operations"],
    accent: "#b59aff",
    repoUrl: "https://github.com/abelchinjh/qoder-corpsec-command-center",
    liveUrl: "https://credence-qoder-corpsec.abelchinjh.workers.dev",
    liveLabel: "Open live demo",
    featured: true,
  },
  {
    title: "AgentProof OS",
    eyebrow: "Open-source agent infrastructure",
    description: "A control plane that turns high-risk multi-agent workflows into verifiable execution receipts, capturing handoffs, tool calls, deterministic checks, human approvals and tamper-evident evidence.",
    tags: ["Python", "Multi-agent systems", "Security", "Evaluation"],
    accent: "#6ed8e7",
    repoUrl: "https://github.com/abelchinjh/agentproof-os",
  },
  {
    title: "BorderProof SG",
    eyebrow: "Evidence-first trade operations",
    description: "A shipment-readiness agent for Singapore SME exporters that reconciles invoices, packing lists and transport references into explainable READY, HOLD or ESCALATE receipts with human approval gates.",
    tags: ["Python", "Document intelligence", "Human-in-the-loop"],
    accent: "#f7c967",
    repoUrl: "https://github.com/abelchinjh/borderproof-sg",
  },
  {
    title: "GreenFlow ASEAN",
    eyebrow: "Climate-finance prototype",
    description: "An ASEAN SME climate-finance system that turns messy records into evidence-maturity scores, fundable action queues and institution-ready portfolio intelligence.",
    tags: ["React", "Fintech", "Climate", "SAP Analytics Cloud"],
    accent: "#65e4b3",
    repoUrl: "https://github.com/abelchinjh/greenflow-asean",
    liveUrl: "https://abelchinjh.github.io/greenflow-asean/",
    liveLabel: "View prototype",
  },
  {
    title: "SkillBridge SG",
    eyebrow: "PyCon Singapore · 7th place",
    description: "An explainable lifelong-learning navigator that maps a learner’s skills to adjacent roles, reveals gaps and produces a four-week evidence-backed plan using deterministic Python scoring.",
    tags: ["Python", "SkillsFuture", "Explainable AI"],
    accent: "#ff806f",
    repoUrl: "https://github.com/abelchinjh/pyconsg26-lifelong-pathfinder",
    liveUrl: "https://abelchinjh.github.io/pyconsg26-lifelong-pathfinder/",
    liveLabel: "Try the demo",
  },
  {
    title: "VoiceBridge",
    eyebrow: "Disaster-response communication",
    description: "An AI communication platform combining speech-to-text, translation, text-to-speech and structured reporting for multilingual ASEAN disaster-response settings.",
    tags: ["React Native", "Speech AI", "Supabase"],
    accent: "#6ed8e7",
    repoUrl: "https://github.com/pangtengg/borneohack",
    liveUrl: "https://youtu.be/9AA6Z2woAgk",
    liveLabel: "Watch demo",
  },
  {
    title: "MayaShield",
    eyebrow: "Anti-scam mobile application",
    description: "A scam-call safety concept that identifies suspicious calls in real time and turns community reports into signals that can protect others.",
    tags: ["Flutter", "Gemini", "Firebase"],
    accent: "#b59aff",
    repoUrl: "https://github.com/abelchinjh/kitahack2026",
    liveUrl: "https://www.youtube.com/watch?v=7UnJo-vcJC0",
    liveLabel: "Watch demo",
  },
  {
    title: "Nyala Neural Forge",
    eyebrow: "Nyala Labs · interactive learning",
    description: "A mobile-first AI-learning booth game built for SunFest: scan a QR code, play instantly and learn through a fast visual metaphor for training signals, overfitting and iteration.",
    tags: ["TypeScript", "Game design", "GitHub Pages"],
    accent: "#f7c967",
    repoUrl: "https://github.com/abelchinjh/nyala-neural-forge",
    liveUrl: "https://abelchinjh.github.io/nyala-neural-forge/",
    liveLabel: "Play the game",
  },
];
