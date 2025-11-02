import { useState } from "react";
import { useUsageData } from "../hooks/useUsageData";
import type { Range } from "../hooks/useUsageData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Usage() {
  const [range, setRange] = useState<Range>("all");
  const data = useUsageData(range);
  const hasData = data.length > 0;

  return (
    <div className="container">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Usage Analytics</h2>
          <div style={{ display: "inline-flex", gap: 8 }}>
            <button
              className="btn"
              aria-pressed={range === "7d"}
              style={{ opacity: range === "7d" ? 1 : 0.7 }}
              onClick={() => setRange("7d")}
            >
              7d
            </button>
            <button
              className="btn"
              aria-pressed={range === "30d"}
              style={{ opacity: range === "30d" ? 1 : 0.7 }}
              onClick={() => setRange("30d")}
            >
              30d
            </button>
            <button
              className="btn"
              aria-pressed={range === "all"}
              style={{ opacity: range === "all" ? 1 : 0.7 }}
              onClick={() => setRange("all")}
            >
              All
            </button>
          </div>
        </div>

        <p style={{ opacity: 0.8, margin: "8px 0 12px" }}>
          Synthetic request data imported from{" "}
          <code>src/data/usage-data.json</code>
        </p>

        {!hasData ? (
          <p>No usage data available.</p>
        ) : (
          <>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#9b8aff"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="#ef6262"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <table className="table" style={{ marginTop: 20, width: "100%" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Requests</th>
                  <th>Errors</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.date}>
                    <td>{d.date}</td>
                    <td>{d.requests}</td>
                    <td>{d.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
