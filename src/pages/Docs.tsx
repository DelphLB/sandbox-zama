import { useClipboard } from "../hooks/useClipboard";

export default function Docs() {
  const { copied, copy } = useClipboard();

  const snippets = {
    curl: `curl -H "Authorization: Bearer sk_live_your_api_key_here" \\
https://sandbox.api.dev/v1/data`,
    node: `import fetch from "node-fetch";

const res = await fetch("https://sandbox.api.dev/v1/data", {
  headers: {
    "Authorization": "Bearer sk_live_your_api_key_here"
  }
});
const json = await res.json();
console.log(json);`,
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Quickstart</h2>
        <p style={{ opacity: 0.8, marginBottom: 12 }}>
          Example calls to a toy endpoint using your API key.
        </p>

        <section style={{ marginBottom: 24 }}>
          <h3>1. Using curl</h3>
          <pre
            style={{
              background: "#111",
              color: "#fafafa",
              padding: 12,
              borderRadius: 6,
              overflowX: "auto",
              position: "relative",
            }}
          >
            <button
              className="btn"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 12,
                padding: "4px 8px",
              }}
              onClick={() => copy(snippets.curl)}
            >
              {copied === snippets.curl ? "Copied!" : "Copy"}
            </button>
            {snippets.curl}
          </pre>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3>2. Using Node.js</h3>
          <pre
            style={{
              background: "#111",
              color: "#fafafa",
              padding: 12,
              borderRadius: 6,
              overflowX: "auto",
              position: "relative",
            }}
          >
            <button
              className="btn"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 12,
                padding: "4px 8px",
              }}
              onClick={() => copy(snippets.node)}
            >
              {copied === snippets.node ? "Copied!" : "Copy"}
            </button>
            {snippets.node}
          </pre>
        </section>

        <div
          style={{
            background: "#fffbe6",
            color: "#8c6d00",
            border: "1px solid #fadb14",
            padding: "10px 14px",
            borderRadius: 4,
            fontSize: 14,
          }}
        >
          ⚠️ <strong>Common error:</strong> Missing or invalid{" "}
          <code>Authorization</code> header will return a{" "}
          <code>401 Unauthorized</code>.
        </div>
      </div>
    </div>
  );
}
