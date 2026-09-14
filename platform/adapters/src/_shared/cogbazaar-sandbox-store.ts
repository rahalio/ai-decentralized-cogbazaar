/**
 * Cogbazaar product sandbox store — in-memory for local / demo.
 */

import { ulid } from 'ulid';

export function nowIso(): string {
  return new Date().toISOString();
}

export function id(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function envelope<T>(data: T, correlationId?: string) {
  return {
    data,
    meta: {
      requestId: correlationId ?? id('req'),
      correlationId,
      generatedAt: nowIso(),
    },
  };
}

export type SandboxListing = {
  listingId: string;
  listingType: 'dataset' | 'kernel' | 'compute';
  sellerParticipantId: string;
  title?: string;
  priceAmount: number;
  currency: string;
  status: 'active' | 'suspended' | 'retired';
  licenceClass?: 'research' | 'commercial' | 'restricted';
  dualUseFlag?: boolean;
  computeToDataEligible?: boolean;
  supportedPocwFormats?: string[];
  takeRateBps?: number;
  createdAt: string;
  updatedAt: string;
};

export type SandboxJob = {
  jobId: string;
  buyerParticipantId: string;
  agentBuyer?: boolean;
  datasetListingId?: string;
  kernelListingId?: string;
  computeListingId?: string;
  computeToData?: boolean;
  status:
    | 'draft'
    | 'matching'
    | 'matched'
    | 'running'
    | 'pocwPending'
    | 'settled'
    | 'disputed'
    | 'refunded'
    | 'cancelled';
  budgetAmount: number;
  currency: string;
  takeRateBps?: number;
  containerSpec?: string;
  bids?: Array<{
    providerParticipantId: string;
    computeListingId: string;
    bidAmount: number;
    currency: string;
    estimatedStartLatencySec?: number;
    supportedPocwFormats?: string[];
    rationale?: string;
  }>;
  selectedProviderParticipantId?: string;
  disputeReason?: string;
  createdAt: string;
  updatedAt: string;
};

export type SandboxAttestation = {
  attestationId: string;
  jobId: string;
  providerParticipantId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'exportReady';
  accepted?: boolean;
  proofPayload?: string;
  proofFormat?: string;
  rejectReason?: string;
  exportPackUrl?: string;
  submittedAt: string;
  reviewedAt?: string;
};

export type SandboxRoyalty = {
  shareId: string;
  jobId: string;
  payeeParticipantId: string;
  role: 'data' | 'kernel' | 'compute' | 'marketplace';
  shareBps: number;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'clawedBack';
  periodKey?: string;
  createdAt: string;
  paidAt?: string;
};

export type SandboxGrantPool = {
  poolId: string;
  name: string;
  metric: string;
  budgetAmount: number;
  currency: string;
  status: 'open' | 'disbursing' | 'closed';
  createdAt: string;
  updatedAt?: string;
};

export type SandboxMetricDeclaration = {
  declarationId: string;
  poolId: string;
  claimantParticipantId: string;
  metricValue: number;
  evidence?: string;
  status: 'declared' | 'approved' | 'paid' | 'rejected';
  declaredAt: string;
  reviewedAt?: string;
};

export type SandboxPolicyRule = {
  ruleId: string;
  ruleType: 'dualUseBlock' | 'agentSpendCap' | 'licenceGate';
  status: 'active' | 'disabled';
  expression: string;
  targetListingId?: string;
  agentAccountId?: string;
  spendCapAmount?: number;
  spendCapCurrency?: string;
  spendUsedAmount?: number;
  dualUseQueue?: boolean;
  createdAt: string;
  updatedAt?: string;
};

export const listingsById = new Map<string, SandboxListing>();
export const jobsById = new Map<string, SandboxJob>();
export const attestationsById = new Map<string, SandboxAttestation>();
export const royaltiesById = new Map<string, SandboxRoyalty>();
export const grantPoolsById = new Map<string, SandboxGrantPool>();
export const declarationsById = new Map<string, SandboxMetricDeclaration>();
export const policyRulesById = new Map<string, SandboxPolicyRule>();

function seed() {
  if (listingsById.size > 0) return;
  const t = nowIso();
  const data: SandboxListing = {
    listingId: id('lst'),
    listingType: 'dataset',
    sellerParticipantId: 'prt_data_lab',
    title: 'UAE satellite soil mosaic',
    priceAmount: 1200,
    currency: 'USD',
    status: 'active',
    licenceClass: 'research',
    dualUseFlag: false,
    computeToDataEligible: true,
    takeRateBps: 250,
    createdAt: t,
    updatedAt: t,
  };
  const kernel: SandboxListing = {
    listingId: id('lst'),
    listingType: 'kernel',
    sellerParticipantId: 'prt_kernel_pub',
    title: 'Vision transformer crop-stress v2',
    priceAmount: 45,
    currency: 'USD',
    status: 'active',
    licenceClass: 'commercial',
    dualUseFlag: false,
    supportedPocwFormats: ['pocw-json-v1'],
    takeRateBps: 250,
    createdAt: t,
    updatedAt: t,
  };
  const compute: SandboxListing = {
    listingId: id('lst'),
    listingType: 'compute',
    sellerParticipantId: 'prt_gpu_farm',
    title: 'A100 80GB · Dubai edge',
    priceAmount: 1.8,
    currency: 'USD',
    status: 'active',
    licenceClass: 'commercial',
    dualUseFlag: false,
    supportedPocwFormats: ['pocw-json-v1', 'pocw-attest-v2'],
    takeRateBps: 250,
    createdAt: t,
    updatedAt: t,
  };
  const dualUse: SandboxListing = {
    listingId: id('lst'),
    listingType: 'kernel',
    sellerParticipantId: 'prt_kernel_pub',
    title: 'Restricted dual-use detector',
    priceAmount: 90,
    currency: 'USD',
    status: 'suspended',
    licenceClass: 'restricted',
    dualUseFlag: true,
    takeRateBps: 250,
    createdAt: t,
    updatedAt: t,
  };
  for (const l of [data, kernel, compute, dualUse]) listingsById.set(l.listingId, l);

  const job: SandboxJob = {
    jobId: id('job'),
    buyerParticipantId: 'prt_buyer_lab',
    datasetListingId: data.listingId,
    kernelListingId: kernel.listingId,
    computeListingId: compute.listingId,
    computeToData: true,
    status: 'matched',
    budgetAmount: 5000,
    currency: 'USD',
    takeRateBps: 250,
    containerSpec: 'cogbazaar/job:soil-stress@sha256:demo',
    bids: [
      {
        providerParticipantId: 'prt_gpu_farm',
        computeListingId: compute.listingId,
        bidAmount: 1.8,
        currency: 'USD',
        estimatedStartLatencySec: 120,
        supportedPocwFormats: ['pocw-json-v1'],
        rationale: 'Lowest latency + PoCW format match',
      },
      {
        providerParticipantId: 'prt_gpu_alt',
        computeListingId: compute.listingId,
        bidAmount: 2.1,
        currency: 'USD',
        estimatedStartLatencySec: 90,
        supportedPocwFormats: ['pocw-json-v1'],
        rationale: 'Spare capacity in Riyadh',
      },
    ],
    selectedProviderParticipantId: 'prt_gpu_farm',
    createdAt: t,
    updatedAt: t,
  };
  jobsById.set(job.jobId, job);

  const att: SandboxAttestation = {
    attestationId: id('pcw'),
    jobId: job.jobId,
    providerParticipantId: 'prt_gpu_farm',
    status: 'pending',
    proofPayload: '{"units":12,"metric":"verified-inference"}',
    proofFormat: 'pocw-json-v1',
    submittedAt: t,
  };
  attestationsById.set(att.attestationId, att);

  const royalty: SandboxRoyalty = {
    shareId: id('ryl'),
    jobId: job.jobId,
    payeeParticipantId: 'prt_kernel_pub',
    role: 'kernel',
    shareBps: 4000,
    amount: 180,
    currency: 'USD',
    status: 'pending',
    periodKey: '2026-09',
    createdAt: t,
  };
  royaltiesById.set(royalty.shareId, royalty);

  const pool: SandboxGrantPool = {
    poolId: id('grp'),
    name: 'PoR Soil Resilience 2026',
    metric: 'peer-reviewed-artefacts',
    budgetAmount: 250000,
    currency: 'USD',
    status: 'open',
    createdAt: t,
    updatedAt: t,
  };
  grantPoolsById.set(pool.poolId, pool);

  const rule: SandboxPolicyRule = {
    ruleId: id('pol'),
    ruleType: 'dualUseBlock',
    status: 'active',
    expression: 'kernel.category in dual_use_catalogue',
    targetListingId: dualUse.listingId,
    dualUseQueue: true,
    createdAt: t,
    updatedAt: t,
  };
  const cap: SandboxPolicyRule = {
    ruleId: id('pol'),
    ruleType: 'agentSpendCap',
    status: 'active',
    expression: 'agent.spend <= cap',
    agentAccountId: 'agt_lab_runner',
    spendCapAmount: 10000,
    spendCapCurrency: 'USD',
    spendUsedAmount: 4200,
    createdAt: t,
    updatedAt: t,
  };
  policyRulesById.set(rule.ruleId, rule);
  policyRulesById.set(cap.ruleId, cap);
}

seed();
