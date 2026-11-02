import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

function NavLinks({ onNavigate }) {
  const handle = onNavigate || (() => {});
  return (
    <>
      <NavLink to="/app" end onClick={handle}>
        Pipeline
      </NavLink>
      <NavLink to="/app/new" onClick={handle}>
        New video
      </NavLink>
      <NavLink to="/app/jobs" onClick={handle}>
        Jobs
      </NavLink>
      <NavLink to="/app/playbooks" onClick={handle}>
        Playbooks
      </NavLink>
      <NavLink to="/app/settings" onClick={handle}>
        Settings
      </NavLink>
    </>
  );
}

export default function Layout() {
  const { user, logout } = useAuth();
  const { resetDemo } = useStore();
  const nav = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const doLogout = () => {
    setMenuOpen(false);
    logout();
    nav("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/app" className="sidebar-brand" aria-label="VideoDoc">
          <img src="/brand.png" alt="" />
          <span>VideoDoc</span>
        </NavLink>
        <nav className="sidebar-nav">
          <NavLinks />
        </nav>
        <div className="sidebar-foot">
          <div className="user-chip">
            {user?.fullName}
            <small>Operator</small>
          </div>
          <button type="button" className="btn btn-ghost" onClick={resetDemo}>
            Reset demo data
          </button>
          <button type="button" className="btn btn-ghost" onClick={doLogout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar mobile-only">
          <NavLink to="/app" className="brand-inline" aria-label="VideoDoc">
            <img src="/brand.png" alt="" />
            <span>VideoDoc</span>
          </NavLink>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>
        <div
          className={`menu-backdrop${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen(false)}
        />
        <aside className={`mobile-drawer${menuOpen ? " is-open" : ""}`}>
          <div className="user-chip" style={{ marginBottom: "0.75rem" }}>
            {user?.fullName}
            <small>Operator</small>
          </div>
          <nav className="mobile-nav-links">
            <NavLinks onNavigate={() => setMenuOpen(false)} />
          </nav>
          <div className="mobile-drawer-actions">
            <button type="button" className="btn btn-ghost" onClick={resetDemo}>
              Reset demo data
            </button>
            <button type="button" className="btn btn-ghost" onClick={doLogout}>
              Log out
            </button>
          </div>
        </aside>
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
