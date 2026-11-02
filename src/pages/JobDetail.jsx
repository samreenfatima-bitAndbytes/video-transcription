import { Link, Navigate, useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";

export default function JobDetail() {
  const { id } = useParams();
  const { jobs, runPipeline, runningId, pipelineStep, pipelineSteps } = useStore();
  const job = jobs.find((j) => j.id === id);
  if (!job) return <Navigate to="/app/jobs" replace />;

  const isRunning = runningId === job.id;

  return (
    <div>
      <div className="section-head">
        <div>
          <Link to="/app/jobs" className="back-link">
            ← Jobs
          </Link>
          <h2>{job.title}</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            {job.source} · {job.duration} · Colab-style cell run
          </p>
        </div>
        <span className={`chip chip-${job.status}`}>{job.status}</span>
      </div>

      <div className="grid-2" style={{ marginBottom: "1rem" }}>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Run pipeline</h3>
          <p className="muted" style={{ marginTop: 0 }}>
            Outputs come from the sample you picked (matched transcript — not a gallery upload).
            Real AI would call Whisper + LLM + vision with keys/GPU on your file.
          </p>
          <ol className="pipeline">
            {pipelineSteps.map((s, i) => {
              const done = job.status === "ready" && !isRunning;
              const active = isRunning && pipelineStep === i;
              const passed = isRunning && pipelineStep > i;
              return (
                <li
                  key={s.id}
                  className={`pipeline-step${active ? " is-active" : ""}${done || passed ? " is-done" : ""}`}
                >
                  <strong>
                    Cell {i + 1} · {s.label}
                  </strong>
                  <span>{s.detail}</span>
                </li>
              );
            })}
          </ol>
          <div className="row-actions" style={{ marginTop: "1rem" }}>
            <button
              type="button"
              className="btn btn-accent"
              disabled={isRunning}
              onClick={() => runPipeline(job.id)}
            >
              {isRunning
                ? "Running…"
                : job.status === "ready"
                  ? "Re-run pipeline"
                  : "Run pipeline"}
            </button>
            {job.status === "ready" ? (
              <Link className="btn btn-ghost" to={`/app/playbooks/${job.id}`}>
                Open playbook
              </Link>
            ) : null}
          </div>
        </div>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Models (notebook)</h3>
          <dl className="detail-dl">
            <div>
              <dt>Speech-to-text</dt>
              <dd>{job.models.stt}</dd>
            </div>
            <div>
              <dt>Vision</dt>
              <dd>{job.models.vision}</dd>
            </div>
            <div>
              <dt>Playbook writer</dt>
              <dd>{job.models.writer}</dd>
            </div>
          </dl>
        </div>
      </div>

      {job.transcript ? (
        <div className="panel" style={{ marginBottom: "1rem" }}>
          <h3 style={{ marginTop: 0 }}>Transcript</h3>
          <p className="prose">{job.transcript}</p>
        </div>
      ) : null}

      {job.summary ? (
        <div className="panel" style={{ marginBottom: "1rem" }}>
          <h3 style={{ marginTop: 0 }}>Document summary</h3>
          <pre className="doc-block">{job.summary}</pre>
        </div>
      ) : null}

      {job.frames?.length ? (
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Vision frames</h3>
          <div className="frame-grid">
            {job.frames.map((f) => (
              <figure key={f.name} className="frame-card">
                <img src={f.src} alt="" />
                <figcaption>
                  <strong>{f.name}</strong>
                  <span>{f.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
