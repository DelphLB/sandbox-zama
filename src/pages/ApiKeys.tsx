import { useClipboard } from "../hooks/useClipboard.tsx";
import { useApiKeys } from "../hooks/useApiKeys";

function maskKey(key: string) {
  if (!key) return "";
  return `${key.slice(0, 6)}${"•".repeat(20)}${key.slice(-4)}`;
}

export default function ApiKeys() {
  const { keys, createKey, revokeKey, regenerateKey, toggleReveal } =
    useApiKeys();

  const { copied, error, copy } = useClipboard();

  return (
    <div className="container">
      <div className="card">
        <h2>API Keys</h2>
        <p style={{ opacity: 0.8, marginBottom: 12 }}>
          Create and manage your sandbox API keys. Keys are stored locally.
        </p>

        <button className="btn" data-testid="keys-create" onClick={createKey}>
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
              <tr key={k.id} data-testid={`key-row-${k.id}`}>
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
                      data-testid={`key-reveal-${k.id}`}
                      onClick={() => toggleReveal(k.id)}
                    >
                      {k.revealed ? "Hide" : "Reveal"}
                    </button>
                    <button
                      className="btn"
                      data-testid={`key-copy-${k.id}`}
                      onClick={() => copy(k.value)}
                    >
                      {copied === k.value ? "Copied!" : "Copy"}
                    </button>
                    <button
                      className="btn"
                      data-testid={`key-regen-${k.id}`}
                      onClick={() => regenerateKey(k.id)}
                    >
                      Regenerate
                    </button>
                    <button
                      className="btn btn-danger"
                      data-testid={`key-revoke-${k.id}`}
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

        {error && (
          <p style={{ color: "red", marginTop: 10 }}>
            Clipboard error: {error}
          </p>
        )}
      </div>
    </div>
  );
}
