import { Link } from "react-router-dom";
import { PIPELINE_STEPS } from "../data/seed";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

export default function Dashboard() {
  const { user } = useAuth();
  const { jobs } = useStore();
  const ready = jobs.filter((j) => j.status === "ready");
  const queued = jobs.filter((j) => j.status === "queued" || j.status === "processing");

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Video → playbook</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            {user?.org} · same flow as the Colab notebook: STT → summary → vision → playbook
          </p>
        </div>
        <Link className="btn btn-accent" to="/app/new">
          New video
        </Link>
      </div>

      <div className="panel" style={{ marginBottom: "1.25rem" }}>
        <h3 style={{ marginTop: 0 }}>Notebook pipeline</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          One operator runs the full chain — no Admin/Trainer split (that was not in the original).
        </p>
        <ol className="pipeline">
          {PIPELINE_STEPS.map((s) => (
            <li key={s.id} className="pipeline-step">
              <strong>{s.label}</strong>
              <span>{s.detail}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid-3" style={{ marginBottom: "1.35rem" }}>
        <div className="stat">
          <strong>{ready.length}</strong>
          <span>Ready playbooks</span>
        </div>
        <div className="stat">
          <strong>{queued.length}</strong>
          <span>In pipeline</span>
        </div>
        <div className="stat">
          <strong>{jobs.length}</strong>
          <span>Jobs in library</span>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-head">
            <h3>Ready playbooks</h3>
            <Link to="/app/playbooks">All</Link>
          </div>
          {ready.length === 0 ? (
            <p className="muted">Run a job to generate a playbook.</p>
          ) : (
            <ul className="stack-list">
              {ready.map((j) => (
                <li key={j.id} className="stack-item">
                  <div className="stack-item-body">
                    <strong>{j.title}</strong>
                    <p>
                      {j.source} · {j.playbook.length} steps
                    </p>
                  </div>
                  <Link className="btn btn-ghost" to={`/app/playbooks/${j.id}`}>
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h3>Needs a run</h3>
            <Link to="/app/jobs">Jobs</Link>
          </div>
          {queued.length === 0 ? (
            <p className="muted">Nothing queued. Add a video to run the pipeline.</p>
          ) : (
            <ul className="stack-list">
              {queued.map((j) => (
                <li key={j.id} className="stack-item">
                  <div className="stack-item-body">
                    <strong>{j.title}</strong>
                    <p>
                      <span className={`chip chip-${j.status}`}>{j.status}</span> · {j.source}
                    </p>
                  </div>
                  <Link className="btn btn-ghost" to={`/app/jobs/${j.id}`}>
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
