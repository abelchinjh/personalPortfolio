import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, GitHubIcon } from "../components";
import { projects } from "../data/projects";
import { awards } from "../data/awards";
import { education } from "../data/education";
import { leadership } from "../data/leadership";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);

  return (
    <main>
      <section className="hero-grid" aria-labelledby="intro-title">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dot" /> Computer science · AI · social impact</p>
          <h1 id="intro-title">Building useful systems for the <span>real world.</span></h1>
          <p className="hero-text">I’m Abel Chin, a Malaysian computer science and business student at SMU, building at the intersection of agentic AI, public-good technology and Malaysia-first compliance infrastructure.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/portfolio"><span>Explore selected work</span> <ArrowUpRight /></Link>
            <a className="button button-secondary" href="https://github.com/abelcjh" target="_blank" rel="noreferrer"><GitHubIcon /> <span>Follow the builds</span></a>
          </div>
        </div>

        <div className="portrait-stage" data-reveal>
          <div className="orbit orbit-one" aria-hidden="true"><i /><i /></div>
          <div className="orbit orbit-two" aria-hidden="true"><i /></div>
          <span className="floating-label label-build">BUILD / TEST / SHIP</span>
          <aside className="profile-card">
            <div className="photo-frame"><img src="/AbelChinPhoto20260321.jpg" alt="Abel Chin" /></div>
            <div className="profile-grid">
              <div className="profile-meta"><span>Based between</span><strong>Malaysia & Singapore</strong></div>
              <div className="profile-meta"><span>Currently</span><strong>SMU CS · ASEAN Scholar</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <div className="signal-strip" aria-label="Current areas of work">
        <div className="signal-track">
          <span>Agent infrastructure</span><b>✦</b><span>Accessible cities</span><b>✦</b><span>Malaysia-first compliance</span><b>✦</b><span>Community technology</span><b>✦</b><span>AI-native commerce</span><b>✦</b>
          <span aria-hidden="true">Agent infrastructure</span><b aria-hidden="true">✦</b><span aria-hidden="true">Accessible cities</span><b aria-hidden="true">✦</b><span aria-hidden="true">Malaysia-first compliance</span><b aria-hidden="true">✦</b><span aria-hidden="true">Community technology</span><b aria-hidden="true">✦</b><span aria-hidden="true">AI-native commerce</span><b aria-hidden="true">✦</b>
        </div>
      </div>

      <section className="statement-band" aria-label="What Abel works on" data-reveal>
        <span className="statement-symbol" aria-hidden="true">✺</span>
        <p>My work sits where <em>frontier technology</em> meets the people and organisations that need it most: communities, operators, founders and Southeast Asian SMEs.</p>
      </section>

      <section className="section education-section" aria-labelledby="education-title">
        <div className="section-heading" data-reveal><p className="eyebrow">01 / Education</p><h2 id="education-title">Two chapters in Singapore, one path through computer science.</h2></div>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.shortName} data-reveal>
              <a className="education-logo" href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.institution}`}>
                <img src={item.logo} alt={`${item.institution} logo`} />
              </a>
              <div className="education-content">
                <div className="education-meta"><span>{item.status}</span><span>{item.period}</span></div>
                <h3>{item.institution}</h3>
                <p className="education-programme">{item.programme}</p>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="featured-work">
        <div className="section-heading" data-reveal><p className="eyebrow">02 / Selected work</p><h2 id="featured-work">Products with a point of view, not just a prompt.</h2><Link to="/portfolio" className="text-link">See all projects <ArrowUpRight /></Link></div>
        <div className="featured-grid">
          {featured.map((project, index) => (
            <article className={`work-card card-${index + 1}`} style={{ "--card-accent": project.accent } as CSSProperties} key={project.title} data-reveal>
              <div className="card-topline"><p className="card-index">0{index + 1}</p><span className="card-spark" aria-hidden="true">✦</span></div>
              <p className="work-eyebrow">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="card-actions">
                <a className="card-link" href={project.repoUrl} target="_blank" rel="noreferrer">View source <ArrowUpRight /></a>
                {project.liveUrl && <a className="card-link muted-link" href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel ?? "Open live"} <ArrowUpRight /></a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" aria-labelledby="community-work">
        <div className="section-heading sticky-heading" data-reveal><p className="eyebrow">03 / Leadership & community</p><h2 id="community-work">Learning in public, building with others.</h2><p className="section-note">Technology matters more when it creates agency for someone else.</p></div>
        <div className="timeline">{leadership.map((item, index) => <article className="timeline-item" key={item.title} data-reveal><div><span className="timeline-number">0{index + 1}</span><div className="timeline-title">{item.logo && <span className="timeline-logo"><img src={item.logo} alt="" aria-hidden="true" /></span>}<h3>{item.title}</h3></div><p className="timeline-period">{item.period}</p></div><div><p>{item.description}</p>{item.highlight && <p className="highlight">{item.highlight}</p>}{item.url && <a className="text-link" href={item.url} target="_blank" rel="noreferrer">Explore Nyala Labs <ArrowUpRight /></a>}</div></article>)}</div>
      </section>

      <section className="section recognition-section" aria-labelledby="recognition">
        <div className="section-heading" data-reveal><p className="eyebrow">04 / Recognition</p><h2 id="recognition">Milestones, with the receipts.</h2></div>
        <div className="recognition-list">{awards.map((award, index) => <div className="recognition-row" key={award.title} data-reveal><span>0{index + 1}</span><strong>{award.title}</strong><p>{award.detail}</p></div>)}</div>
      </section>

      <section className="contact-card" aria-labelledby="contact-title" data-reveal>
        <div className="contact-motif" aria-hidden="true"><i /><i /><i /></div>
        <p className="eyebrow">Let’s build something useful</p>
        <h2 id="contact-title">Open to thoughtful collaborations and ambitious ideas.</h2>
        <p>Especially work around responsible AI, public-good products, compliance operations and Southeast Asia.</p>
        <div className="hero-actions"><a className="button button-primary" href="mailto:abelchinjh@gmail.com"><span>Email Abel</span> <ArrowUpRight /></a><a className="button button-secondary" href="https://linkedin.com/in/abelchinjh" target="_blank" rel="noreferrer"><span>Connect on LinkedIn</span> <ArrowUpRight /></a></div>
      </section>

      <footer className="footer"><span>© {new Date().getFullYear()} Abel Chin</span><span>React + TypeScript · motion drawn in JavaScript</span></footer>
    </main>
  );
}
