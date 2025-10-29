import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        <p>Bienvenue dans la sandbox 👋</p>
        <button className="btn" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}

function SignIn() {
  const { signIn } = useAuth();
  const email = "demo@test.com";

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 400 }}>
        <h2>Sign in</h2>
        <p>Mock (email prérempli)</p>
        <button className="btn" onClick={() => signIn(email)}>
          Continue as {email}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <header>
        <Link to="/" style={{ fontWeight: 700 }}>
          Sandbox Console
        </Link>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/signin">Sign In</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </>
  );
}
