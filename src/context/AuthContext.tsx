import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthState = { token: string | null; exp: number | null };
type AuthContextType = AuthState & {
  isAuthed: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const STORAGE_KEY = "sandbox_auth_token";
const nowSec = () => Math.floor(Date.now() / 1000);

function readFromStorage(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, exp: null };

    const parsed = JSON.parse(raw);
    if (!parsed.exp || parsed.exp < nowSec()) {
      localStorage.removeItem(STORAGE_KEY);
      return { token: null, exp: null };
    }
    return parsed;
  } catch {
    return { token: null, exp: null };
  }
}

function writeToStorage(state: AuthState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readFromStorage());

  useEffect(() => {
    if (!state.exp) return;

    const delay = state.exp * 1000 - Date.now();
    if (delay <= 0) {
      localStorage.removeItem(STORAGE_KEY);
      setState({ token: null, exp: null });
      return;
    }

    const timeout = setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      setState({ token: null, exp: null });
    }, delay);

    return () => clearTimeout(timeout);
  }, [state.exp]);

  const value = useMemo<AuthContextType>(
    () => ({
      ...state,
      isAuthed: !!state.token,
      signIn(email: string) {
        const token = btoa(`${email}|${Math.random().toString(36).slice(2)}`);
        const exp = nowSec() + 60 * 30; 
        const newState = { token, exp };
        writeToStorage(newState);
        setState(newState);
      },
      signOut() {
        localStorage.removeItem(STORAGE_KEY);
        setState({ token: null, exp: null });
      },
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
