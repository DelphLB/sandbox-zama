export default function Dashboard() {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to the Sandbox Console</h2>
        <p style={{ opacity: 0.85, maxWidth: 640 }}>
          This developer console lets you simulate how an API gateway works.
          You generate fake API keys, and explore synthetic usage
          analytics.  
          <br /><br />Nothing leaves your machine.
        </p>
        <p style={{ marginTop: 20 }}>
          👉 Try creating a key in the <strong>API Keys</strong> section,  
          or check out your <strong>Usage</strong> data and <strong>Docs</strong> quickstart examples.
        </p>
      </div>
    </div>
  );
}
