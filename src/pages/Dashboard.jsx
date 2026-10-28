import { Link } from "react-router-dom";
import { DEMO_USERS } from "../data/seed";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

export default function Dashboard() {
  const { user } = useAuth();
  const { jobs, usage } = useStore();
  const isAdmin = Boolean(user?.isAdmin);
  const ready = jobs.filter((j) => j.status === "ready");
  const queued = jobs.filter((j) => j.status === "queued" || j.status === "processing");

  if (isAdmin) {
    return (
      <div>
        <div className="section-head">
          <div>
            <h2>Org overview</h2>
            <p className="muted" style={{ margin: "0.35rem 0 0" }}>
              {user?.org} · Admin — usage, team, and pipeline health
            </p>
          </div>
          <Link className="btn btn-accent" to="/app/team">
            Manage team
          </Link>
        </div>

        <div className="grid-4" style={{ marginBottom: "1.35rem" }}>
          <div className="stat">
            <strong>{usage.videosProcessed}</strong>
            <span>Videos processed</span>
          </div>
          <div className="stat">
            <strong>{usage.playbooksReady}</strong>
            <span>Playbooks ready</span>
          </div>
          <div className="stat">
            <strong>{usage.sttMinutes}</strong>
            <span>STT minutes</span>
          </div>
          <div className="stat">
            <strong>{DEMO_USERS.length}</strong>
            <span>Team seats</span>
          </div>
        </div>

        <div className="grid-2">
          <div className="panel">
            <div className="panel-head">
              <h3>Pipeline health</h3>
              <Link to="/app/jobs">All jobs</Link>
            </div>
            <ul className="stack-list">
              <li className="stack-item">
                <div className="stack-item-body">
                  <strong>{ready.length} ready</strong>
                  <p>Playbooks available to the training org</p>
                </div>
              </li>
              <li className="stack-item">
                <div className="stack-item-body">
                  <strong>{queued.length} in flight</strong>
                  <p>Queued or processing jobs from trainers</p>
                </div>
              </li>
              <li className="stack-item">
                <div className="stack-item-body">
                  <strong>{usage.visionFrames} frames</strong>
                  <p>LLaMA vision captions generated</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="panel">
            <div className="panel-head">
              <h3>People</h3>
              <Link to="/app/team">Team</Link>
            </div>
            <ul className="stack-list">
              {DEMO_USERS.map((u) => (
                <li key={u.id} className="stack-item">
                  <div className="stack-item-body">
                    <strong>{u.fullName}</strong>
                    <p>
                      {u.email} · {u.isAdmin ? "Admin" : "Trainer"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ margin: "0.75rem 0 0", fontSize: "0.9rem" }}>
              Trainers create videos and playbooks. You oversee seats and usage — not the upload
              queue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>My workspace</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            {user?.org} · Trainer — upload, run STT, ship playbooks
          </p>
        </div>
        <Link className="btn btn-accent" to="/app/new">
          New video
        </Link>
      </div>

      <div className="grid-3" style={{ marginBottom: "1.35rem" }}>
        <div className="stat">
          <strong>{ready.length}</strong>
          <span>My ready playbooks</span>
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
            <h3>Ready to share</h3>
            <Link to="/app/playbooks">Playbooks</Link>
          </div>
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
        </div>
        <div className="panel">
          <div className="panel-head">
            <h3>Needs a run</h3>
            <Link to="/app/jobs">Jobs</Link>
          </div>
          {queued.length === 0 ? (
            <p className="muted">Nothing queued. Start a new video to run STT → playbook.</p>
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
                    Run
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
