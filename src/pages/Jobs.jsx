import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

export default function Jobs() {
  const { user } = useAuth();
  const { jobs } = useStore();
  const isAdmin = Boolean(user?.isAdmin);
  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Jobs</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            {isAdmin
              ? "Org pipeline monitor — trainers own uploads and runs"
              : "Video → STT → summary → vision frames → playbook"}
          </p>
        </div>
        {!isAdmin ? (
          <Link className="btn btn-accent" to="/app/new">
            New video
          </Link>
        ) : null}
      </div>
      <div className="panel">
        <ul className="stack-list">
          {jobs.map((j) => (
            <li key={j.id} className="stack-item">
              <div className="stack-item-body">
                <strong>{j.title}</strong>
                <p>
                  {j.source} · {j.duration} · {j.createdAt}
                </p>
                <div className="chip-row">
                  <span className={`chip chip-${j.status}`}>{j.status}</span>
                  <span className="chip">{j.models.stt.split("/").pop()}</span>
                </div>
              </div>
              <Link className="btn btn-ghost" to={`/app/jobs/${j.id}`}>
                Open
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
