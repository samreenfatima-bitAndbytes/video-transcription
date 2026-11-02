import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SAMPLE_LIBRARY } from "../data/seed";
import { useStore } from "../hooks/useStore";

export default function NewJob() {
  const { queueSample, runPipeline } = useStore();
  const nav = useNavigate();
  const [selected, setSelected] = useState(SAMPLE_LIBRARY[0]?.id || "");
  const [autoRun, setAutoRun] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!selected) {
      setError("Pick a sample recording.");
      return;
    }
    const id = queueSample(selected);
    if (!id) {
      setError("Could not queue that sample.");
      return;
    }
    nav(`/app/jobs/${id}`);
    if (autoRun) {
      window.setTimeout(() => runPipeline(id), 400);
    }
  };

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>New video</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            Choose a sample recording — each has a matching transcript and playbook (no gallery
            upload in this demo).
          </p>
        </div>
      </div>

      <aside className="ai-note" aria-label="Real AI requirements">
        <p>
          This demo only plays back prepared outputs for the sample you pick. A production or Colab
          run needs GPU/runtime access, a Whisper (or similar) STT model, an LLM for
          summaries/playbooks, a vision model for frame captions, plus API keys or Hugging Face
          tokens — and it would accept your own video file, not a fixed library.
        </p>
      </aside>

      <form className="panel" onSubmit={onSubmit}>
        <p className="sample-hint">Sample library</p>
        <div className="sample-grid" role="radiogroup" aria-label="Sample recordings">
          {SAMPLE_LIBRARY.map((s) => {
            const active = selected === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`sample-card${active ? " is-selected" : ""}`}
                onClick={() => setSelected(s.id)}
              >
                <img src={s.thumb} alt="" />
                <span className="sample-card-body">
                  <strong>{s.title}</strong>
                  <small>
                    {s.source} · {s.duration}
                  </small>
                  <span className="sample-blurb">{s.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>

        <label className="check-row" style={{ marginTop: "1rem" }}>
          <input
            type="checkbox"
            checked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
          />
          Run full pipeline after queue (audio → STT → playbook)
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="row-actions" style={{ marginTop: "1rem" }}>
          <button className="btn btn-accent" type="submit" disabled={!selected}>
            {autoRun ? "Queue & run pipeline" : "Queue sample"}
          </button>
        </div>
      </form>
    </div>
  );
}
