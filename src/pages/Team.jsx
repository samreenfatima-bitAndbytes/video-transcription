import { Navigate } from "react-router-dom";
import { DEMO_USERS } from "../data/seed";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

export default function Team() {
  const { user } = useAuth();
  const { jobs, usage } = useStore();
  if (!user?.isAdmin) return <Navigate to="/app" replace />;

  const trainers = DEMO_USERS.filter((u) => !u.isAdmin);
  const admins = DEMO_USERS.filter((u) => u.isAdmin);

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Team</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            Admin-only · seats and roles for {user.org}
          </p>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: "1.25rem" }}>
        <div className="stat">
          <strong>{DEMO_USERS.length}</strong>
          <span>People</span>
        </div>
        <div className="stat">
          <strong>{trainers.length}</strong>
          <span>Trainers</span>
        </div>
        <div className="stat">
          <strong>{usage.videosProcessed}</strong>
          <span>Org videos</span>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Admins</h3>
          <ul className="stack-list">
            {admins.map((u) => (
              <li key={u.id} className="stack-item">
                <div className="stack-item-body">
                  <strong>{u.fullName}</strong>
                  <p>{u.email}</p>
                </div>
                <span className="chip chip-ready">Admin</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Trainers</h3>
          <ul className="stack-list">
            {trainers.map((u) => (
              <li key={u.id} className="stack-item">
                <div className="stack-item-body">
                  <strong>{u.fullName}</strong>
                  <p>
                    {u.email} · runs STT → playbook jobs ({jobs.length} in library)
                  </p>
                </div>
                <span className="chip">Trainer</span>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ margin: "0.75rem 0 0", fontSize: "0.9rem" }}>
            Trainers upload recordings and generate playbooks. Admins monitor usage and seats.
          </p>
        </div>
      </div>
    </div>
  );
}
