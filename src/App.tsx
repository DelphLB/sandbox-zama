import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import { useFeatureFlags } from "./components/FeatureFlagContext";

export default function App() {
  const { isAuthed, signOut } = useAuth();
  const { compactMode, toggleCompact } = useFeatureFlags();

  return (
    <>
      <header>
        <Link to="/" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Sandbox Console
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/">Dashboard</Link>
          {!isAuthed && <Link to="/signin">Sign In</Link>}
          {isAuthed && (
            <button
              className="btn"
              style={{ padding: "4px 10px" }}
              onClick={signOut}
            >
              Sign out
            </button>
          )}
          <button
            className="btn"
            style={{ background: compactMode ? "#444" : "#9b8aff" }}
            onClick={toggleCompact}
          >
            {" "}
            {compactMode ? "Compact mode: ON" : "Compact mode: OFF"}{" "}
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </>
  );
}
