export default function Contact() {
  return (
    <section
      id="contact"
      className="contact section"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">OPEN A CONVERSATION</p>
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
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href="https://x.com/@abelchinjh" target="_blank" rel="noreferrer">
          X <span aria-hidden="true">↗</span>
        </a>
        <a
          href="https://discordapp.com/users/1334801780273315870"
          target="_blank"
          rel="noreferrer"
        >
          Discord <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
