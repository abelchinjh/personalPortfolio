import type { CSSProperties } from "react";
import { ArrowUpRight } from "../components";
import { projects } from "../data/projects";

export default function PortfolioPage() {
  return (
    <main className="work-page">
      <header className="work-header" data-reveal>
        <p className="eyebrow"><span className="eyebrow-dot" /> Selected work · 2025—2026</p>
        <h1>Systems made to <span>move.</span></h1>
        <p>Public products, competition builds and open-source experiments across responsible AI, accessibility, compliance, climate finance and community infrastructure. Repositories include work I own and collaborations where I contributed materially.</p>
      </header>

      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-row" style={{ "--card-accent": project.accent } as CSSProperties} key={project.title} data-reveal>
            <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="project-details">
              <p className="work-eyebrow">{project.eyebrow}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="project-actions">
              {project.liveUrl && <a className="button button-primary compact-button" href={project.liveUrl} target="_blank" rel="noreferrer"><span>{project.liveLabel ?? "Open project"}</span> <ArrowUpRight /></a>}
              {project.repoUrl && <a className="button button-secondary compact-button" href={project.repoUrl} target="_blank" rel="noreferrer"><span>GitHub</span> <ArrowUpRight /></a>}
            </div>
          </article>
        ))}
      </div>

      <section className="contact-card portfolio-contact" data-reveal>
        <p className="eyebrow">The work continues</p>
        <h2>Follow the builds as they become real.</h2>
        <div className="hero-actions"><a className="button button-primary" href="https://github.com/abelchinjh" target="_blank" rel="noreferrer"><span>Explore GitHub</span> <ArrowUpRight /></a><a className="button button-secondary" href="mailto:abelchinjh@gmail.com"><span>Start a conversation</span> <ArrowUpRight /></a></div>
      </section>
    </main>
  );
}
