import { useEffect, useState } from "react";

type ApiKey = {
  id: string;
  label: string;
  value: string;
  createdAt: string;
  revealed?: boolean;
};

const STORAGE_KEY = "sandbox_api_keys";

function base64url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateApiKey(prefix = "sk_live_") {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return prefix + base64url(bytes);
}

function maskKey(key: string) {
  if (!key) return '';
  return `${key.slice(0, 6)}${'•'.repeat(20)}${key.slice(-4)}`;
}

export default function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  }, [keys]);

  function createKey() {
    const id = crypto.randomUUID();
    const label = `Key-${keys.length + 1}`;
    const value = generateApiKey();
    const createdAt = new Date().toISOString();
    setKeys([...keys, { id, label, value, createdAt, revealed: false }]);
  }

  function revokeKey(id: string) {
    setKeys(keys.filter((k) => k.id !== id));
  }

  function regenerateKey(id: string) {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, value: generateApiKey(), revealed: false } : k
      )
    );
  }

  async function copyKey(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(value);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      console.error("Clipboard error");
    }
  }

  function toggleReveal(id: string) {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, revealed: !k.revealed } : k))
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>API Keys</h2>
        <p style={{ opacity: 0.8, marginBottom: 12 }}>
          Create and manage your sandbox API keys. Keys are stored locally.
        </p>

        <button className="btn" onClick={createKey}>
          + Create Key
        </button>

        <table className="table" style={{ marginTop: 16, width: "100%" }}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th style={{ textAlign: "right" }}>Created</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", opacity: 0.6 }}>
                  No keys yet.
                </td>
              </tr>
            )}

            {keys.map((k) => (
              <tr key={k.id}>
                <td>{k.label}</td>
                <td>
                  <code style={{ userSelect: "none" }}>
                    {k.revealed ? k.value : maskKey(k.value)}
                  </code>
                </td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  {new Date(k.createdAt).toLocaleString()}
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: 8 }}>
                    <button
                      className="btn"
                      onClick={() => toggleReveal(k.id)}
                      style={{ width: 78 }} // largeur fixe pour stabilité
                    >
                      {k.revealed ? "Hide" : "Reveal"}
                    </button>
                    <button className="btn" onClick={() => copyKey(k.value)}>
                      {copiedKey === k.value ? "Copied!" : "Copy"}
                    </button>
                    <button className="btn" onClick={() => regenerateKey(k.id)}>
                      Regenerate
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => revokeKey(k.id)}
                    >
                      Revoke
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
