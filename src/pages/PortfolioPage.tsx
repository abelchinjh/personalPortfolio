import { useState } from "react";
import { projects } from "../data/projects";
import Contact from "../Contact";
export default function PortfolioPage() {
  const [query, setQuery] = useState("");
  const filtered = projects.filter((p) =>
    `${p.title} ${p.description} ${p.tags.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <main id="main" tabIndex={-1} className="work-page">
      <header className="work-header section">
        <p className="eyebrow">PUBLIC PORTFOLIO / 29 ENTRIES</p>
        <h1>
          Work<span className="blue">.</span>
        </h1>
        <p className="lead">
          Projects, prototypes and collaborations,
          <br />
          with their original context.
        </p>
        <p>
          This archive documents my public work. I’m currently building in
          stealth.
        </p>
      </header>
      <section className="section archive" aria-label="Project archive">
        <div className="search-bar">
          <label htmlFor="project-search">Search projects</label>
          <div>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, technology or topic"
            />
            {query && (
              <button onClick={() => setQuery("")}>Clear search</button>
            )}
          </div>
          <p role="status">
            {filtered.length} of {projects.length} projects
          </p>
        </div>
        <div className="project-list">
          {filtered.map((p) => (
            <article className="project-row" key={p.title}>
              <span className="project-number">
                {String(projects.indexOf(p) + 1).padStart(2, "0")}
              </span>
              <div className="project-details">
                <p className="project-context">{p.eyebrow}</p>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <div className="tag-list">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.title === "UniFriend" && (
                  <div className="project-gallery">
                    {[1, 2, 3].map((n) => (
                      <a
                        key={n}
                        href={`/UniFriend${n}.png`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open original UniFriend screenshot ${n}`}
                      >
                        <img
                          src={`/images/unifriend-${n}.webp`}
                          width="440"
                          height="280"
                          loading="lazy"
                          alt={`Historical UniFriend interface, screenshot ${n}`}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="project-links">
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer">
                    {p.liveLabel ?? "Open project"} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <h2>No projects match that search.</h2>
            <button className="button secondary" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}
      </section>
      <Contact />
    </main>
  );
}
