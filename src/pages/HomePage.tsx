import Hero from "../Hero";
import Scene from "../Scene";
import Contact from "../Contact";
import ArchiveMetrics from "../ArchiveMetrics";
import AgentLaneFlow from "../AgentLaneFlow";
import { projects } from "../data/projects";
import { education } from "../data/education";
import { leadership } from "../data/leadership";
import { awards } from "../data/awards";
export default function HomePage() {
  return <main id="main" tabIndex={-1}>
    <Hero />
    <div className="surface cover-hero">
      <section id="selected" className="section selected" aria-labelledby="selected-title">
        <div className="section-heading"><div><h2 id="selected-title">Selected Work</h2></div>
          <a className="text-link" href="/portfolio">Explore all {projects.length} projects <span aria-hidden="true">↗</span></a></div>
        <div className="featured-list">{projects.filter(p => p.featured).map((p, i) => <article className="featured" key={p.title}>
          <div className="project-index">0{i + 1}<span aria-hidden="true">/</span></div>
          <div className="featured-body"><p className="project-context">{p.eyebrow}</p><h3>{p.title}</h3><p className="project-description">{p.description}</p>
            <div className="tag-list">{p.tags.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div>
            <div className="project-links">{p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer">View source ↗</a>}{p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">{p.liveLabel ?? "Open demo"} ↗</a>}</div>
          </div></article>)}</div>
      </section>
      <ArchiveMetrics /><AgentLaneFlow />
    </div>
    <Scene />
    <div className="surface after-scene">
      <section id="background" className="section background" aria-labelledby="background-title">
        <div className="background-intro"><div><h2 id="background-title">Background<span className="blue">.</span></h2>
          <p className="lead">I’m Abel, a founder building in stealth.</p><p>My portfolio brings together software projects, collaborations and competition work from my path so far.</p></div>
          <img className="portrait" src="/images/portrait-576.webp" srcSet="/images/portrait-576.webp 576w, /images/portrait-864.webp 864w" sizes="(max-width: 640px) 216px, 288px" width="288" height="384" loading="lazy" alt="Abel Chin" />
        </div>
        <div className="background-columns"><div><h3>Education & scholarships</h3>{education.map(e => <article className="education-entry" key={e.shortName}>
          <p className="eyebrow">{e.period}</p><h4>{e.institution}</h4><p>{e.status}</p><p>{e.programme}</p><p className="scholarship">{e.scholarship}</p>
          <details><summary>Education details</summary><p>{e.detail}</p><p>{e.scholarshipDetail}</p></details></article>)}</div>
          <div><h3>Experience</h3>{leadership.map(e => <article className="experience-entry" key={e.title}><h4>{e.title}</h4><p className="project-context">{e.period}</p><p>{e.description}</p>{e.highlight && <p>{e.highlight}</p>}</article>)}</div>
        </div>
      </section>
      <section className="section recognition" aria-labelledby="recognition-title"><h2 id="recognition-title">Selected recognition<span className="blue">.</span></h2>
        <div className="award-list">{awards.slice(2, 6).map(a => <article key={a.title}><h3>{a.title}</h3><p>{a.detail}</p></article>)}</div>
        <details className="all-recognition"><summary>View all recognition</summary>{awards.slice(6).map(a => <article key={a.title}><h3>{a.title}</h3><p>{a.detail}</p></article>)}</details>
      </section><Contact />
    </div>
  </main>;
}
