import { Link } from "react-router-dom";
import { useStore } from "../hooks/useStore";

export default function Playbooks() {
  const { jobs } = useStore();
  const ready = jobs.filter((j) => j.status === "ready" && j.playbook?.length);
  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Playbooks</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            Structured training steps with frame references
          </p>
        </div>
      </div>
      <div className="playbook-grid">
        {ready.map((j) => (
          <Link key={j.id} to={`/app/playbooks/${j.id}`} className="playbook-card">
            <img src={j.playbook[0]?.frame || "/img/feature.jpg"} alt="" />
            <div>
              <h3>{j.title}</h3>
              <p className="muted">
                {j.playbook.length} steps · {j.source}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
