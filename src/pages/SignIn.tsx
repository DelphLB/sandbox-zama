import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

interface LocationState {
  from?: Location;
}

export default function SignIn() {
  const nav = useNavigate();
  const loc = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("demo@test.com");

  const from = (loc.state as LocationState)?.from?.pathname || "/";
  function handleSignIn() {
    signIn(email);
    nav(from, { replace: true });
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>Sign in</h2>
      <div className="card" style={{ display: "grid", gap: 8 }}>
        <label>Email</label>
        <input
          data-testid="signin-email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          data-testid="signin-continue"
          className="btn"
          onClick={() => handleSignIn()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
