import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

export default function NewJob() {
  const { addJob, runPipeline } = useStore();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("Uploaded lecture");
  const [fileName, setFileName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = addJob({ title, source });
    nav(`/app/jobs/${id}`);
    window.setTimeout(() => runPipeline(id), 400);
  };

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>New video</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            Queue a recording — the demo runs the full STT → playbook pipeline locally.
          </p>
        </div>
      </div>
      <form className="panel form-narrow" onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Product onboarding walkthrough"
            required
          />
        </label>
        <label>
          Source type
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option>Uploaded lecture</option>
            <option>Meeting recording</option>
            <option>Internal training</option>
          </select>
        </label>
        <label>
          Video file
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          />
        </label>
        {fileName ? <p className="muted">Selected: {fileName} (demo uses seeded media)</p> : null}
        <button className="btn btn-accent" type="submit">
          Queue &amp; run pipeline
        </button>
      </form>
    </div>
  );
}
