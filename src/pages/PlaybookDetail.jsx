import { Link, Navigate, useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";

export default function PlaybookDetail() {
  const { id } = useParams();
  const { jobs } = useStore();
  const job = jobs.find((j) => j.id === id);
  if (!job || !job.playbook?.length) return <Navigate to="/app/playbooks" replace />;

  return (
    <div>
      <div className="section-head">
        <div>
          <Link to="/app/playbooks" className="back-link">
            ← Playbooks
          </Link>
          <h2>{job.title}</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            Training playbook · {job.playbook.length} steps
          </p>
        </div>
        <Link className="btn btn-ghost" to={`/app/jobs/${job.id}`}>
          Source job
        </Link>
      </div>

      <ol className="playbook-steps">
        {job.playbook.map((s) => (
          <li key={s.step} className="playbook-step">
            <div className="playbook-step-copy">
              <span className="step-num">Step {s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
            <figure>
              <img src={s.frame} alt="" />
              <figcaption className="frame-ref">Frame · {s.frameLabel}</figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}
