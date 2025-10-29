import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("demo@acme.dev");

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>Sign in</h2>
      <div className="card" style={{ display: "grid", gap: 8 }}>
        <label>Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn" onClick={() => signIn(email)}>
          Continue
        </button>
        <p style={{ opacity: 0.8 }}>Sign In</p>
      </div>
    </div>
  );
}
