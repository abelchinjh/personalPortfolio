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
          <a className="hero-credential" href="#education-title">
            <span className="credential-logo"><img src="/brand-assets/nus.svg" alt="" aria-hidden="true" /></span>
            <span><strong>National University of Singapore</strong><span>Former student · ASEAN scholar</span></span>
          </a>
          <h1 id="intro-title">Abel Chin.<span>AI systems builder.</span></h1>
          <p className="hero-text">I studied Computer Engineering and Computer Science at NUS. My work now spans agentic software, accessible navigation and tools for community organisations.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/portfolio"><span>Explore selected work</span> <ArrowUpRight /></Link>
            <a className="button button-secondary" href="https://github.com/abelchinjh" target="_blank" rel="noreferrer"><GitHubIcon /> <span>GitHub</span></a>
          </div>
        </div>

        <div className="portrait-stage" data-reveal>
          <aside className="profile-card">
            <div className="photo-frame"><img src="/AbelChinPhoto20260321.jpg" alt="Abel Chin" /></div>
            <div className="profile-grid">
              <div className="profile-meta"><span>Based in</span><strong>Malaysia</strong></div>
              <div className="profile-meta"><span>Practice</span><strong>AI & applied software</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section education-section" aria-labelledby="education-title">
        <div className="section-heading" data-reveal><p className="eyebrow">01 / Education</p><h2 id="education-title" tabIndex={-1}>A Singapore education.<br />An independent path.</h2><p className="section-note">From Victoria School and Victoria Junior College to a semester at NUS, supported by ASEAN scholarships.</p></div>
        <div className="education-grid">
          {education.map((item) => (
            <article className={`education-card ${item.shortName === "NUS" ? "education-primary" : "education-school"}`} key={item.shortName} data-reveal>
              {item.logo && <a className="education-logo" href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.institution}`}>
                <img src={item.logo} alt={`${item.institution} logo`} />
              </a>}
              <div className="education-content">
                <div className="education-meta"><span>{item.status}</span><span>{item.period}</span></div>
                <h3><a href={item.url} target="_blank" rel="noreferrer">{item.institution}</a></h3>
                <p className="education-programme">{item.programme}</p>
                <p>{item.detail}</p>
                <div className="education-scholarship"><strong>{item.scholarship}</strong><p>{item.scholarshipDetail}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="featured-work">
        <div className="section-heading" data-reveal><p className="eyebrow">02 / Selected work</p><h2 id="featured-work">Software, put to work.</h2><Link to="/portfolio" className="text-link">See all projects <ArrowUpRight /></Link></div>
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
        <div className="section-heading sticky-heading" data-reveal><p className="eyebrow">03 / Experience & community</p><h2 id="community-work">Beyond the code.</h2><p className="section-note">AI education, volunteer mentoring and business intelligence.</p></div>
        <div className="timeline">{leadership.map((item, index) => <article className="timeline-item" key={item.title} data-reveal><div><span className="timeline-number">0{index + 1}</span><div className="timeline-title">{item.logo && <span className="timeline-logo"><img src={item.logo} alt="" aria-hidden="true" /></span>}<h3>{item.title}</h3></div><p className="timeline-period">{item.period}</p></div><div><p>{item.description}</p>{item.highlight && <p className="highlight">{item.highlight}</p>}{item.url && <a className="text-link" href={item.url} target="_blank" rel="noreferrer">Explore Nyala Labs <ArrowUpRight /></a>}</div></article>)}</div>
      </section>

      <section className="section recognition-section" aria-labelledby="recognition">
        <div className="section-heading" data-reveal><p className="eyebrow">04 / Recognition</p><h2 id="recognition">Scholarships & recognition.</h2></div>
        <div className="recognition-list">{awards.map((award, index) => <div className="recognition-row" key={award.title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><strong>{award.title}</strong><p>{award.detail}</p></div>)}</div>
      </section>

      <section className="contact-card" aria-labelledby="contact-title" data-reveal>
        <div className="contact-motif" aria-hidden="true"><i /><i /><i /></div>
        <p className="eyebrow">Get in touch</p>
        <h2 id="contact-title">Have a problem worth working on?</h2>
        <p>I’m interested in applied AI, accessibility and software that helps people do their work.</p>
        <div className="hero-actions"><a className="button button-primary" href="mailto:abelchinjh@gmail.com"><span>Email Abel</span> <ArrowUpRight /></a><a className="button button-secondary" href="https://linkedin.com/in/abelchinjh" target="_blank" rel="noreferrer"><span>Connect on LinkedIn</span> <ArrowUpRight /></a></div>
      </section>

      <footer className="footer"><span>© {new Date().getFullYear()} Abel Chin</span><span>Independent work · Malaysia</span></footer>
    </main>
  );
}
