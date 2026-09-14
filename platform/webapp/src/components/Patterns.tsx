export function CommodityAisleSwitch({
  value,
  onChange,
}: {
  value: "dataset" | "kernel" | "compute" | "all";
  onChange: (v: "dataset" | "kernel" | "compute" | "all") => void;
}) {
  const opts = [
    ["all", "All aisles"],
    ["dataset", "Data"],
    ["kernel", "Kernels"],
    ["compute", "Compute"],
  ] as const;
  return (
    <div className="aisle-switch">
      {opts.map(([v, label]) => (
        <button
          key={v}
          type="button"
          className={value === v ? "active" : undefined}
          onClick={() => onChange(v)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function DualUseSeal({ flagged }: { flagged?: boolean }) {
  if (!flagged) return null;
  return <span className="badge seal">Dual-use sealed</span>;
}

export function ComputeToDataBadge({ on }: { on?: boolean }) {
  if (!on) return null;
  return <span className="badge ok">Compute-to-data</span>;
}

export function AgentSpendCapMeter({
  used,
  cap,
  currency,
}: {
  used: number;
  cap: number;
  currency: string;
}) {
  const pct = cap > 0 ? Math.min(100, Math.round((used / cap) * 100)) : 0;
  return (
    <div className="stack">
      <div className="muted" style={{ fontSize: "0.8rem" }}>
        Agent spend {used} / {cap} {currency} ({pct}%)
      </div>
      <div className="meter">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function RoyaltySplitBar({
  shares,
}: {
  shares: Array<{ role: string; shareBps: number }>;
}) {
  const colors: Record<string, string> = {
    data: "#3d8b6e",
    kernel: "#c4a35a",
    compute: "#6b8cae",
    marketplace: "#b85c38",
  };
  return (
    <div className="stack">
      <div className="split-bar">
        {shares.map((s) => (
          <span
            key={s.role}
            title={`${s.role} ${s.shareBps} bps`}
            style={{
              width: `${s.shareBps / 100}%`,
              background: colors[s.role] ?? "#555",
            }}
          />
        ))}
      </div>
      <div className="muted" style={{ fontSize: "0.75rem" }}>
        {shares.map((s) => `${s.role} ${(s.shareBps / 100).toFixed(1)}%`).join(" · ")}
      </div>
    </div>
  );
}

export function PoCWStampRow({
  status,
  format,
}: {
  status: string;
  format?: string;
}) {
  const cls =
    status === "accepted"
      ? "ok"
      : status === "rejected"
        ? "seal"
        : status === "pending"
          ? "warn"
          : undefined;
  return (
    <span className={`badge ${cls ?? ""}`}>
      PoCW {status}
      {format ? ` · ${format}` : ""}
    </span>
  );
}

export function MultiBidTable({
  bids,
  selected,
  onAccept,
}: {
  bids: Array<{
    providerParticipantId: string;
    bidAmount: number;
    currency: string;
    estimatedStartLatencySec?: number;
    rationale?: string;
  }>;
  selected?: string;
  onAccept?: (providerParticipantId: string) => void;
}) {
  if (!bids?.length) return <p className="muted">No bids yet — widen the job spec.</p>;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Provider</th>
          <th>Bid</th>
          <th>Latency</th>
          <th>Why</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {bids.map((b) => (
          <tr key={b.providerParticipantId}>
            <td>
              {b.providerParticipantId}
              {selected === b.providerParticipantId ? (
                <span className="badge ok"> selected</span>
              ) : null}
            </td>
            <td>
              {b.bidAmount} {b.currency}
            </td>
            <td>{b.estimatedStartLatencySec ?? "—"}s</td>
            <td className="muted">{b.rationale ?? "—"}</td>
            <td>
              {onAccept ? (
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => onAccept(b.providerParticipantId)}
                >
                  Accept route
                </button>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function JobCartLine({
  label,
  listingId,
  price,
}: {
  label: string;
  listingId?: string;
  price?: string;
}) {
  return (
    <div className="panel" style={{ marginBottom: 0 }}>
      <strong>{label}</strong>
      <div className="muted" style={{ marginTop: 4 }}>
        {listingId ?? "Missing aisle — add from catalogue"}
        {price ? ` · ${price}` : ""}
      </div>
    </div>
  );
}

export function PoRMetricDeclaration({
  metric,
  onDeclare,
}: {
  metric: string;
  onDeclare: (value: number, evidence: string) => void;
}) {
  return (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onDeclare(Number(fd.get("value")), String(fd.get("evidence") ?? ""));
        e.currentTarget.reset();
      }}
    >
      <p className="muted">Declared metric: {metric}</p>
      <div className="field">
        <label>Metric value</label>
        <input name="value" type="number" step="any" required />
      </div>
      <div className="field">
        <label>Evidence</label>
        <textarea name="evidence" rows={2} />
      </div>
      <button type="submit" className="btn primary">
        Declare metric
      </button>
    </form>
  );
}
