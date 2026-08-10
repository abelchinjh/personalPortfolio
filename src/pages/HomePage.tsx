import { Link } from "react-router-dom";
import { ArrowUpRight, GitHubIcon } from "../components";
import { projects } from "../data/projects";
import { awards } from "../data/awards";
import { leadership } from "../data/leadership";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);
  return (
    <main>
      <section className="hero-grid" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">Computer science · AI · social impact</p>
          <h1 id="intro-title">Building useful systems for the real world.</h1>
          <p className="hero-text">I’m Abel Chin, a Malaysian computer science student at SMU and a builder working across agentic AI, community technology and Malaysia-first compliance infrastructure.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/portfolio">Explore selected work <ArrowUpRight /></Link>
            <a className="button button-secondary" href="https://github.com/abelcjh" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
          </div>
        </div>
        <aside className="profile-card">
          <img src="/AbelChinPhoto20260321.jpg" alt="Abel Chin" />
          <div className="profile-meta"><span>Based between</span><strong>Malaysia & Singapore</strong></div>
          <div className="profile-meta"><span>Currently</span><strong>SMU CS · ASEAN Scholar</strong></div>
        </aside>
      </section>

      <section className="statement-band" aria-label="What Abel works on">
        <p>My work sits where <em>frontier technology</em> meets the people and organisations that need it most: students, communities, founders and Malaysian SMEs.</p>
      </section>

      <section className="section" aria-labelledby="featured-work">
        <div className="section-heading"><p className="eyebrow">01 / Selected work</p><h2 id="featured-work">Product-minded experiments with a point of view.</h2><Link to="/portfolio" className="text-link">See all projects <ArrowUpRight /></Link></div>
        <div className="featured-grid">
          {featured.map((project, index) => <article className={`work-card card-${index + 1}`} key={project.title}>
            <p className="card-index">0{index + 1}</p><p className="work-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p>
            <div className="tag-list">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
            <a className="card-link" href={project.repoUrl} target="_blank" rel="noreferrer">View source <ArrowUpRight /></a>
          </article>)}
        </div>
      </section>

      <section className="section split-section" aria-labelledby="community-work">
        <div className="section-heading"><p className="eyebrow">02 / Leadership & community</p><h2 id="community-work">Learning in public, building with others.</h2></div>
        <div className="timeline">{leadership.map(item => <article className="timeline-item" key={item.title}><div><h3>{item.title}</h3><p className="timeline-period">{item.period}</p></div><div><p>{item.description}</p>{item.highlight && <p className="highlight">{item.highlight}</p>}{item.url && <a className="text-link" href={item.url} target="_blank" rel="noreferrer">Explore Nyala Labs <ArrowUpRight /></a>}</div></article>)}</div>
      </section>

      <section className="section recognition-section" aria-labelledby="recognition"><div className="section-heading"><p className="eyebrow">03 / Recognition</p><h2 id="recognition">A few milestones so far.</h2></div><div className="recognition-list">{awards.map((award, index) => <div className="recognition-row" key={award.title}><span>0{index + 1}</span><strong>{award.title}</strong><p>{award.detail}</p></div>)}</div></section>

      <section className="contact-card" aria-labelledby="contact-title"><p className="eyebrow">Let’s build something useful</p><h2 id="contact-title">Open to thoughtful conversations, collaborations and ambitious ideas.</h2><div className="hero-actions"><a className="button button-primary" href="mailto:abelchinjh@gmail.com">Email Abel <ArrowUpRight /></a><a className="button button-secondary" href="https://linkedin.com/in/abelchinjh" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight /></a></div></section>

      <footer className="footer"><span>© {new Date().getFullYear()} Abel Chin</span><span>Designed and built with React + TypeScript</span></footer>
    </main>
  );
}
