import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="marketing">
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/img/hero.jpg" alt="" />
          <div className="hero-scrim" />
        </div>
        <header className="site-nav">
          <Link to="/" className="brand-inline" aria-label="VideoDoc">
            <img src="/brand.png" alt="" />
            <span>VideoDoc</span>
          </Link>
          <Link className="btn btn-ghost-light" to={user ? "/app" : "/login"}>
            {user ? "Open workspace" : "Sign in"}
          </Link>
        </header>
        <div className="wrap hero-content">
          <h1 className="brand-hero">VideoDoc</h1>
          <p className="hero-lead">
            Turn lectures and meetings into structured playbooks — transcript, insights, and
            frame-aligned steps in one workspace.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-accent" to={user ? "/app" : "/login"}>
              {user ? "Go to dashboard" : "Enter workspace"}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap pipeline-showcase">
          <div className="section-copy">
            <h2>Audio in. Playbook out.</h2>
            <p className="muted">
              Whisper STT, document summaries, LLaMA vision frames, and a step playbook — one
              continuous pipeline.
            </p>
          </div>
          <ol className="flow-track" aria-label="Pipeline stages">
            <li>
              <span className="flow-num">01</span>
              <strong>Speech-to-text</strong>
              <span>Whisper cleans the lecture into a readable transcript</span>
            </li>
            <li>
              <span className="flow-num">02</span>
              <strong>Insights</strong>
              <span>Chunk summaries and FAQ extracts for docs</span>
            </li>
            <li>
              <span className="flow-num">03</span>
              <strong>Vision frames</strong>
              <span>LLaMA 3.2 captions key moments from the video</span>
            </li>
            <li>
              <span className="flow-num">04</span>
              <strong>Playbook</strong>
              <span>Steps aligned with frame references</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-media">
        <div className="wrap media-block">
          <figure className="feature-bleed">
            <img src="/img/feature.jpg" alt="Printed training playbook on a desk" />
          </figure>
          <div className="media-caption">
            <h2>Built for training &amp; ops teams</h2>
            <p className="muted">
              Keep institutional knowledge out of chat threads — ship a playbook after every
              lecture or standup.
            </p>
            <Link className="text-link" to={user ? "/app/jobs/job-asana" : "/login"}>
              Preview the Asana activation sample →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
