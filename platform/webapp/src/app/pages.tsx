import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listingsService } from "../services/domains/listings";
import { jobsService } from "../services/domains/jobs";
import { pocwAttestationsService } from "../services/domains/pocw-attestations";
import { royaltySharesService } from "../services/domains/royalty-shares";
import { grantPoolsService } from "../services/domains/grant-pools";
import { policyRulesService } from "../services/domains/policy-rules";
import {
  AgentSpendCapMeter,
  CommodityAisleSwitch,
  ComputeToDataBadge,
  DualUseSeal,
  JobCartLine,
  MultiBidTable,
  PoCWStampRow,
  PoRMetricDeclaration,
  RoyaltySplitBar,
} from "../components/Patterns";

type Listing = {
  listingId: string;
  listingType: "dataset" | "kernel" | "compute";
  title?: string;
  priceAmount: number;
  currency: string;
  status: string;
  licenceClass?: string;
  dualUseFlag?: boolean;
  computeToDataEligible?: boolean;
  takeRateBps?: number;
  sellerParticipantId: string;
};

type Job = {
  jobId: string;
  status: string;
  budgetAmount: number;
  currency: string;
  datasetListingId?: string;
  kernelListingId?: string;
  computeListingId?: string;
  computeToData?: boolean;
  takeRateBps?: number;
  bids?: Array<{
    providerParticipantId: string;
    computeListingId: string;
    bidAmount: number;
    currency: string;
    estimatedStartLatencySec?: number;
    rationale?: string;
  }>;
  selectedProviderParticipantId?: string;
  disputeReason?: string;
};

function itemsOf<T>(data: unknown): T[] {
  const d = data as { items?: T[] } | undefined;
  return d?.items ?? [];
}

export function BuyerHomePage() {
  const jobsQ = useQuery({
    queryKey: ["jobs", "home"],
    queryFn: () => jobsService.list(),
  });
  const pocwQ = useQuery({
    queryKey: ["pocw", "home"],
    queryFn: () => pocwAttestationsService.list({ status: "pending" }),
  });
  const jobs = itemsOf<Job>(jobsQ.data?.data);
  const pending = itemsOf(pocwQ.data?.data);
  return (
    <div>
      <h1 className="page-title">Buyer home</h1>
      <p className="page-sub">
        What cognitive work is in flight, settled, or blocked — and am I paying for
        useful work?
      </p>
      <div className="kpi-strip">
        <div className="kpi">
          <div className="label">Open jobs</div>
          <div className="value">{jobs.filter((j) => !["settled", "cancelled", "refunded"].includes(j.status)).length}</div>
        </div>
        <div className="kpi">
          <div className="label">Settled w/ PoCW</div>
          <div className="value">{jobs.filter((j) => j.status === "settled").length}</div>
        </div>
        <div className="kpi">
          <div className="label">PoCW pending</div>
          <div className="value">{pending.length}</div>
        </div>
        <div className="kpi">
          <div className="label">Take-rate</div>
          <div className="value">2.5%</div>
        </div>
      </div>
      <div className="grid-2">
        <div className="panel">
          <h2>Open jobs</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {jobs.slice(0, 8).map((j) => (
                <tr key={j.jobId}>
                  <td>
                    <Link to={`/jobs/${j.jobId}`}>{j.jobId.slice(0, 16)}…</Link>
                  </td>
                  <td>{j.status}</td>
                  <td>
                    {j.budgetAmount} {j.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h2>Alerts</h2>
          <ul className="stack">
            <li>
              <Link to="/pocw">Pending PoCW attestations ({pending.length})</Link>
            </li>
            <li>
              <Link to="/policy?queue=dualUse">Dual-use queue</Link>
            </li>
            <li>
              <Link to="/composer">Compose next cognitive job</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CataloguePage() {
  const [params, setParams] = useSearchParams();
  const aisleParam = params.get("aisle");
  const aisle =
    aisleParam === "dataset" || aisleParam === "kernel" || aisleParam === "compute"
      ? aisleParam
      : "all";
  const q = useQuery({
    queryKey: ["listings", aisle],
    queryFn: () =>
      listingsService.list(aisle === "all" ? undefined : { listingType: aisle }),
  });
  const items = itemsOf<Listing>(q.data?.data);
  return (
    <div>
      <h1 className="page-title">Catalogue</h1>
      <p className="page-sub">Three commodity aisles — data, kernels, compute.</p>
      <CommodityAisleSwitch
        value={aisle}
        onChange={(v) => {
          if (v === "all") setParams({});
          else setParams({ aisle: v });
        }}
      />
      {q.isError ? <p className="error">{(q.error as Error).message}</p> : null}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Aisle</th>
            <th>Licence</th>
            <th>Price</th>
            <th>Flags</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((l) => (
            <tr key={l.listingId}>
              <td>{l.title ?? l.listingId}</td>
              <td>{l.listingType}</td>
              <td>{l.licenceClass ?? "—"}</td>
              <td>
                {l.priceAmount} {l.currency}
                {l.takeRateBps != null ? (
                  <span className="muted"> · take {(l.takeRateBps / 100).toFixed(1)}%</span>
                ) : null}
              </td>
              <td>
                <DualUseSeal flagged={l.dualUseFlag} />{" "}
                <ComputeToDataBadge on={l.computeToDataEligible} />
              </td>
              <td>
                <Link className="btn" to={`/composer?add=${l.listingId}&type=${l.listingType}`}>
                  Add to job
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComposerPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const listingsQ = useQuery({
    queryKey: ["listings", "composer"],
    queryFn: () => listingsService.list(),
  });
  const listings = itemsOf<Listing>(listingsQ.data?.data);
  const byId = useMemo(
    () => Object.fromEntries(listings.map((l) => [l.listingId, l])),
    [listings]
  );

  const [datasetId, setDatasetId] = useState(
    params.get("type") === "dataset" ? params.get("add") ?? "" : ""
  );
  const [kernelId, setKernelId] = useState(
    params.get("type") === "kernel" ? params.get("add") ?? "" : ""
  );
  const [computeId, setComputeId] = useState(
    params.get("type") === "compute" ? params.get("add") ?? "" : ""
  );
  const [computeToData, setComputeToData] = useState(true);
  const [budget, setBudget] = useState(5000);
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: () =>
      jobsService.create({
        buyerParticipantId: "prt_buyer_lab",
        datasetListingId: datasetId || undefined,
        kernelListingId: kernelId || undefined,
        computeListingId: computeId || undefined,
        computeToData,
        budgetAmount: budget,
        currency: "USD",
        takeRateBps: 250,
        containerSpec: "cogbazaar/job:compose@local",
      }),
    onSuccess: async (res) => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      const jobId = (res.data as Job | undefined)?.jobId;
      if (jobId) navigate(`/jobs/${jobId}`);
    },
  });

  return (
    <div>
      <h1 className="page-title">Job composer</h1>
      <p className="page-sub">
        Bundle data + kernel + compute with disclosed take-rate and optional
        compute-to-data mode.
      </p>
      <div className="grid-2">
        <div className="stack">
          <JobCartLine
            label="Dataset"
            listingId={datasetId}
            price={
              byId[datasetId]
                ? `${byId[datasetId].priceAmount} ${byId[datasetId].currency}`
                : undefined
            }
          />
          <JobCartLine
            label="Kernel"
            listingId={kernelId}
            price={
              byId[kernelId]
                ? `${byId[kernelId].priceAmount} ${byId[kernelId].currency}`
                : undefined
            }
          />
          <JobCartLine
            label="Compute"
            listingId={computeId}
            price={
              byId[computeId]
                ? `${byId[computeId].priceAmount} ${byId[computeId].currency}`
                : undefined
            }
          />
        </div>
        <div className="panel stack">
          <div className="field">
            <label>Dataset listing</label>
            <select value={datasetId} onChange={(e) => setDatasetId(e.target.value)}>
              <option value="">Select…</option>
              {listings
                .filter((l) => l.listingType === "dataset")
                .map((l) => (
                  <option key={l.listingId} value={l.listingId}>
                    {l.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="field">
            <label>Kernel listing</label>
            <select value={kernelId} onChange={(e) => setKernelId(e.target.value)}>
              <option value="">Select…</option>
              {listings
                .filter((l) => l.listingType === "kernel" && !l.dualUseFlag)
                .map((l) => (
                  <option key={l.listingId} value={l.listingId}>
                    {l.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="field">
            <label>Compute listing</label>
            <select value={computeId} onChange={(e) => setComputeId(e.target.value)}>
              <option value="">Select…</option>
              {listings
                .filter((l) => l.listingType === "compute")
                .map((l) => (
                  <option key={l.listingId} value={l.listingId}>
                    {l.title}
                  </option>
                ))}
            </select>
          </div>
          <label>
            <input
              type="checkbox"
              checked={computeToData}
              onChange={(e) => setComputeToData(e.target.checked)}
            />{" "}
            Compute-to-data (data stays put)
          </label>
          <div className="field">
            <label>Budget (USD)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
          <p className="muted">Take-rate disclosure: 2.5% marketplace</p>
          <button
            type="button"
            className="btn primary"
            disabled={create.isPending}
            onClick={() => create.mutate()}
          >
            Save draft & open job
          </button>
          {create.isError ? (
            <p className="error">{(create.error as Error).message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function JobsPage() {
  const q = useQuery({ queryKey: ["jobs"], queryFn: () => jobsService.list() });
  const jobs = itemsOf<Job>(q.data?.data);
  return (
    <div>
      <h1 className="page-title">Jobs</h1>
      <p className="page-sub">Cognitive job lifecycle — match → PoCW → settle.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Job</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.jobId}>
              <td>
                <Link to={`/jobs/${j.jobId}`}>{j.jobId}</Link>
              </td>
              <td>{j.status}</td>
              <td>
                {j.budgetAmount} {j.currency}
              </td>
              <td>
                <ComputeToDataBadge on={j.computeToData} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function JobDetailPage({ jobId }: { jobId: string }) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => jobsService.get(jobId),
  });
  const job = q.data?.data as Job | undefined;
  const match = useMutation({
    mutationFn: () => jobsService.match(jobId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", jobId] }),
  });
  const accept = useMutation({
    mutationFn: (providerParticipantId: string) =>
      jobsService.acceptRoute(jobId, { providerParticipantId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", jobId] }),
  });
  if (q.isLoading) return <p className="muted">Loading…</p>;
  if (!job) return <p className="error">Job not found</p>;
  return (
    <div>
      <h1 className="page-title">Job {job.jobId.slice(0, 18)}…</h1>
      <p className="page-sub">
        Status <strong>{job.status}</strong> · take-rate{" "}
        {((job.takeRateBps ?? 250) / 100).toFixed(1)}%
      </p>
      <div className="panel">
        <h2>Multi-provider bids</h2>
        <div style={{ marginBottom: 12 }}>
          <button type="button" className="btn" onClick={() => match.mutate()}>
            Request match
          </button>
        </div>
        <MultiBidTable
          bids={job.bids ?? []}
          selected={job.selectedProviderParticipantId}
          onAccept={(p) => accept.mutate(p)}
        />
      </div>
      <div className="panel">
        <Link className="btn" to="/pocw">
          Open PoCW workspace
        </Link>{" "}
        <Link className="btn danger" to="/disputes">
          Dispute
        </Link>
      </div>
    </div>
  );
}

export function PocwPage() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["pocw"],
    queryFn: () => pocwAttestationsService.list(),
  });
  const items = itemsOf<{
    attestationId: string;
    jobId: string;
    status: string;
    proofFormat?: string;
    providerParticipantId: string;
  }>(q.data?.data);
  const accept = useMutation({
    mutationFn: (id: string) => pocwAttestationsService.accept(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pocw"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  const reject = useMutation({
    mutationFn: (id: string) =>
      pocwAttestationsService.reject(id, { reason: "Proof failed verification" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pocw"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  const exportPack = useMutation({
    mutationFn: (id: string) => pocwAttestationsService.exportPack(id),
  });
  return (
    <div>
      <h1 className="page-title">PoCW attestation workspace</h1>
      <p className="page-sub">
        Cognitive-work proof is the clearing event — accept, reject, or export.
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Attestation</th>
            <th>Job</th>
            <th>Provider</th>
            <th>Stamp</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a.attestationId}>
              <td>{a.attestationId.slice(0, 16)}…</td>
              <td>
                <Link to={`/jobs/${a.jobId}`}>{a.jobId.slice(0, 12)}…</Link>
              </td>
              <td>{a.providerParticipantId}</td>
              <td>
                <PoCWStampRow status={a.status} format={a.proofFormat} />
              </td>
              <td style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => accept.mutate(a.attestationId)}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => reject.mutate(a.attestationId)}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => exportPack.mutate(a.attestationId)}
                >
                  Export pack
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {exportPack.data ? (
        <pre className="panel" style={{ overflow: "auto" }}>
          {JSON.stringify(exportPack.data, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export function PublicPocwViewerPage({ attestationId }: { attestationId: string }) {
  const q = useQuery({
    queryKey: ["pocw", attestationId],
    queryFn: () => pocwAttestationsService.get(attestationId),
  });
  const a = q.data?.data as
    | { attestationId: string; status: string; proofPayload?: string; proofFormat?: string }
    | undefined;
  return (
    <div className="main" style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="wordmark" style={{ marginBottom: 16 }}>
        <span className="wordmark-seal">C</span> Cogbazaar · public PoCW viewer
      </div>
      {a ? (
        <div className="panel stack">
          <PoCWStampRow status={a.status} format={a.proofFormat} />
          <pre style={{ whiteSpace: "pre-wrap" }}>{a.proofPayload}</pre>
        </div>
      ) : (
        <p className="muted">Loading attestation…</p>
      )}
    </div>
  );
}

export function StatementsPage() {
  const q = useQuery({
    queryKey: ["royalties"],
    queryFn: () => royaltySharesService.list({ periodKey: "2026-09" }),
  });
  const items = itemsOf<{
    shareId: string;
    jobId: string;
    role: string;
    shareBps: number;
    amount: number;
    currency: string;
    status: string;
  }>(q.data?.data);
  return (
    <div>
      <h1 className="page-title">Statements & royalty ledger</h1>
      <p className="page-sub">Period 2026-09 · take-rate disclosed per row.</p>
      <div className="panel">
        <RoyaltySplitBar shares={items.map((i) => ({ role: i.role, shareBps: i.shareBps }))} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Share</th>
            <th>Job</th>
            <th>Role</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.shareId}>
              <td>{r.shareId.slice(0, 14)}…</td>
              <td>{r.jobId.slice(0, 12)}…</td>
              <td>{r.role}</td>
              <td>
                {r.amount} {r.currency}
              </td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProviderPage() {
  const q = useQuery({
    queryKey: ["jobs", "provider"],
    queryFn: () => jobsService.list(),
  });
  const jobs = itemsOf<Job>(q.data?.data).filter((j) =>
    ["matched", "running", "pocwPending"].includes(j.status)
  );
  return (
    <div>
      <h1 className="page-title">Provider · matched jobs</h1>
      <p className="page-sub">Earn on cognitive work — know which PoCW format unlocks payment.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Job</th>
            <th>Status</th>
            <th>Selected</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.jobId}>
              <td>
                <Link to={`/jobs/${j.jobId}`}>{j.jobId}</Link>
              </td>
              <td>{j.status}</td>
              <td>{j.selectedProviderParticipantId ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PublisherPage() {
  const listingsQ = useQuery({
    queryKey: ["listings", "kernel"],
    queryFn: () => listingsService.list({ listingType: "kernel" }),
  });
  const royQ = useQuery({
    queryKey: ["royalties", "publisher"],
    queryFn: () => royaltySharesService.list({ role: "kernel" }),
  });
  const kernels = itemsOf<Listing>(listingsQ.data?.data);
  const royalties = itemsOf<{ amount: number; currency: string; shareBps: number; role: string }>(
    royQ.data?.data
  );
  return (
    <div>
      <h1 className="page-title">Kernel publisher</h1>
      <p className="page-sub">Per-execution compensation and licence controls.</p>
      <div className="panel">
        <RoyaltySplitBar
          shares={
            royalties.length
              ? royalties.map((r) => ({ role: r.role, shareBps: r.shareBps }))
              : [{ role: "kernel", shareBps: 4000 }]
          }
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Kernel</th>
            <th>Licence</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {kernels.map((k) => (
            <tr key={k.listingId}>
              <td>{k.title}</td>
              <td>{k.licenceClass}</td>
              <td>
                {k.status} <DualUseSeal flagged={k.dualUseFlag} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GrantsPage() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["grants"],
    queryFn: () => grantPoolsService.list(),
  });
  const pools = itemsOf<{
    poolId: string;
    name: string;
    metric: string;
    budgetAmount: number;
    currency: string;
    status: string;
  }>(q.data?.data);
  const declare = useMutation({
    mutationFn: ({ poolId, value, evidence }: { poolId: string; value: number; evidence: string }) =>
      grantPoolsService.declareMetric(poolId, {
        claimantParticipantId: "prt_researcher",
        metricValue: value,
        evidence,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grants"] }),
  });
  return (
    <div>
      <h1 className="page-title">PoR grant pools</h1>
      <p className="page-sub">Transparent research incentives — declare metrics, approve disbursements.</p>
      {pools.map((p) => (
        <div className="panel grid-2" key={p.poolId}>
          <div>
            <h2>{p.name}</h2>
            <p className="muted">
              {p.status} · budget {p.budgetAmount} {p.currency}
            </p>
          </div>
          <PoRMetricDeclaration
            metric={p.metric}
            onDeclare={(value, evidence) =>
              declare.mutate({ poolId: p.poolId, value, evidence })
            }
          />
        </div>
      ))}
    </div>
  );
}

export function PolicyPage() {
  const [params] = useSearchParams();
  const queue = params.get("queue");
  const q = useQuery({
    queryKey: ["policy", queue],
    queryFn: () =>
      policyRulesService.list(
        queue === "dualUse"
          ? { dualUseQueue: true }
          : queue === "agentCaps"
            ? { ruleType: "agentSpendCap" }
            : undefined
      ),
  });
  const rules = itemsOf<{
    ruleId: string;
    ruleType: string;
    status: string;
    expression: string;
    dualUseQueue?: boolean;
    spendCapAmount?: number;
    spendUsedAmount?: number;
    spendCapCurrency?: string;
    agentAccountId?: string;
  }>(q.data?.data);
  return (
    <div>
      <h1 className="page-title">Policy & dual-use gates</h1>
      <p className="page-sub">
        Block listed kernel classes without taking the market down.
      </p>
      {rules
        .filter((r) => r.ruleType === "agentSpendCap")
        .map((r) => (
          <div className="panel" key={r.ruleId}>
            <h2>Agent {r.agentAccountId}</h2>
            <AgentSpendCapMeter
              used={r.spendUsedAmount ?? 0}
              cap={r.spendCapAmount ?? 1}
              currency={r.spendCapCurrency ?? "USD"}
            />
          </div>
        ))}
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Expression</th>
            <th>Status</th>
            <th>Queue</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r) => (
            <tr key={r.ruleId}>
              <td>{r.ruleType}</td>
              <td>{r.expression}</td>
              <td>{r.status}</td>
              <td>{r.dualUseQueue ? <span className="badge seal">dual-use</span> : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DisputesPage() {
  const q = useQuery({
    queryKey: ["jobs", "disputed"],
    queryFn: () => jobsService.list({ status: "disputed" }),
  });
  const jobs = itemsOf<Job>(q.data?.data);
  const refund = useMutation({
    mutationFn: (jobId: string) => jobsService.refund(jobId),
  });
  return (
    <div>
      <h1 className="page-title">Disputes</h1>
      <p className="page-sub">Failed PoCW and settlement disputes.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Job</th>
            <th>Reason</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.jobId}>
              <td>{j.jobId}</td>
              <td>{j.disputeReason ?? "—"}</td>
              <td>
                <button
                  type="button"
                  className="btn"
                  onClick={() => refund.mutate(j.jobId)}
                >
                  Refund
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!jobs.length ? <p className="muted">No open disputes.</p> : null}
    </div>
  );
}
