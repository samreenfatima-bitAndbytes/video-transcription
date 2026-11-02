import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { useAuth } from "./hooks/useAuth";
import { useStore } from "./hooks/useStore";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NewJob from "./pages/NewJob";
import PlaybookDetail from "./pages/PlaybookDetail";
import Playbooks from "./pages/Playbooks";
import Settings from "./pages/Settings";

function RequireAuth({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}

export default function App() {
  const { toast } = useStore();
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="new" element={<NewJob />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="playbooks" element={<Playbooks />} />
          <Route path="playbooks/:id" element={<PlaybookDetail />} />
          <Route path="settings" element={<Settings />} />
          <Route path="team" element={<Navigate to="/app" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
