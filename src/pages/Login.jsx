import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import { DEMO_USERS } from "../data/seed";
import { useAuth } from "../hooks/useAuth";

const DEMO = DEMO_USERS[0];

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState(DEMO.email);
  const [password, setPassword] = useState(DEMO.password);
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
            Single-operator demo of the Colab video→playbook pipeline. No role split.
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
            <p className="demo-label">Demo account</p>
            <button
              type="button"
              className="demo-chip"
              onClick={() => {
                setEmail(DEMO.email);
                setPassword(DEMO.password);
                setError("");
              }}
            >
              <strong>Operator</strong>
              <span>{DEMO.email}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
