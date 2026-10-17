export default function Contact() {
  return (
    <section
      id="contact"
      className="contact section"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title">
        Get in touch<span className="blue">.</span>
      </h2>
      <p>For introductions, collaborations and technical conversations.</p>
      <div className="contact-links">
        <a href="mailto:hello@abelchinjh.com">
          hello@abelchinjh.com <span aria-hidden="true">↗</span>
        </a>
        <a
          href="https://github.com/abelchinjh"
          target="_blank"
          rel="noreferrer"
        >
          <img className="contact-icon" src="/icons/github.svg" width="20" height="20" alt="" />GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href="https://x.com/abelchinjh" target="_blank" rel="noreferrer">
          <img className="contact-icon" src="/icons/x.svg" width="20" height="20" alt="" />X <span aria-hidden="true">↗</span>
        </a>
        <a
          href="https://discordapp.com/users/1334801780273315870"
          target="_blank"
          rel="noreferrer"
        >
          <img className="contact-icon" src="/icons/discord.svg" width="20" height="20" alt="" />Discord <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
