import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import { DEMO_USERS } from "../data/seed";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState(DEMO_USERS[0].email);
  const [password, setPassword] = useState(DEMO_USERS[0].password);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/app" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    nav("/app");
  };

  return (
    <div className="login-wrap">
      <div className="login-visual" aria-hidden="true">
        <img src="/img/login.jpg" alt="" />
        <div className="login-visual-copy">
          <p className="brand-mark">VideoDoc</p>
          <h2>From waveform to playbook</h2>
        </div>
      </div>
      <div className="login-mobile-photo" aria-hidden="true">
        <img src="/img/login.jpg" alt="" />
      </div>
      <div className="login-panel">
        <div className="login-card">
          <Link to="/" className="brand-inline login-logo" aria-label="VideoDoc">
            <img src="/brand.png" alt="" />
            <span>VideoDoc</span>
          </Link>
          <h1>Sign in</h1>
          <p className="muted">
            Admin = org overview &amp; team. Trainer = upload videos &amp; build playbooks.
          </p>
          <form onSubmit={onSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </label>
            <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <p className="form-error">{error}</p> : null}
            <button className="btn btn-accent btn-block" type="submit">
              Continue
            </button>
          </form>
          <div className="demo-accounts">
            <p className="demo-label">Quick fill</p>
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                className="demo-chip"
                onClick={() => {
                  setEmail(u.email);
                  setPassword(u.password);
                  setError("");
                }}
              >
                <strong>{u.isAdmin ? "Admin" : "Trainer"}</strong>
                <span>{u.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
