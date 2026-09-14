/**
 * JobRepository - sandbox implementation for Cogbazaar demo.
 */

import type { JobRepository } from "@cogbazaar/services/jobs";
import {
  envelope,
  id,
  jobsById,
  listingsById,
  nowIso,
  type SandboxJob,
} from "../_shared/cogbazaar-sandbox-store.js";

export class JobRepositoryDdb implements JobRepository {
  constructor(private readonly dynamoClient: any) {}

  async listJobs(
    input: Parameters<JobRepository["listJobs"]>[0]
  ): Promise<Awaited<ReturnType<JobRepository["listJobs"]>>> {
    const raw = input as Record<string, unknown>;
    let items = [...jobsById.values()];
    if (raw.status) items = items.filter((j) => j.status === raw.status);
    if (raw.buyerParticipantId)
      items = items.filter((j) => j.buyerParticipantId === raw.buyerParticipantId);
    return envelope({ items }, String(raw.correlationId ?? "")) as any;
  }

  async createJob(
    input: Parameters<JobRepository["createJob"]>[0]
  ): Promise<Awaited<ReturnType<JobRepository["createJob"]>>> {
    const raw = input as Record<string, unknown>;
    const t = nowIso();
    const job: SandboxJob = {
      jobId: id("job"),
      buyerParticipantId: String(raw.buyerParticipantId ?? "prt_buyer"),
      agentBuyer: Boolean(raw.agentBuyer),
      datasetListingId: raw.datasetListingId as string | undefined,
      kernelListingId: raw.kernelListingId as string | undefined,
      computeListingId: raw.computeListingId as string | undefined,
      computeToData: Boolean(raw.computeToData),
      status: "draft",
      budgetAmount: Number(raw.budgetAmount ?? 0),
      currency: String(raw.currency ?? "USD"),
      takeRateBps: raw.takeRateBps as number | undefined,
      containerSpec: raw.containerSpec as string | undefined,
      bids: [],
      createdAt: t,
      updatedAt: t,
    };
    jobsById.set(job.jobId, job);
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }

  async getJob(
    input: Parameters<JobRepository["getJob"]>[0]
  ): Promise<Awaited<ReturnType<JobRepository["getJob"]>>> {
    const raw = input as Record<string, unknown>;
    const job = jobsById.get(String(raw.jobId));
    if (!job) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }

  async updateJob(
    input: Parameters<JobRepository["updateJob"]>[0]
  ): Promise<Awaited<ReturnType<JobRepository["updateJob"]>>> {
    const raw = input as Record<string, unknown>;
    const job = jobsById.get(String(raw.jobId));
    if (!job) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    Object.assign(job, {
      datasetListingId: raw.datasetListingId ?? job.datasetListingId,
      kernelListingId: raw.kernelListingId ?? job.kernelListingId,
      computeListingId: raw.computeListingId ?? job.computeListingId,
      computeToData: raw.computeToData ?? job.computeToData,
      budgetAmount: raw.budgetAmount ?? job.budgetAmount,
      currency: raw.currency ?? job.currency,
      takeRateBps: raw.takeRateBps ?? job.takeRateBps,
      containerSpec: raw.containerSpec ?? job.containerSpec,
      agentBuyer: raw.agentBuyer ?? job.agentBuyer,
      updatedAt: nowIso(),
    });
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }
}

/** Shared helpers used by action repositories in the jobs domain. */
export function requireJob(jobId: string): SandboxJob {
  const job = jobsById.get(jobId);
  if (!job) throw Object.assign(new Error("Not found"), { statusCode: 404 });
  return job;
}

export function seedBids(job: SandboxJob) {
  const computeOffers = [...listingsById.values()].filter(
    (l) => l.listingType === "compute" && l.status === "active"
  );
  job.bids = computeOffers.map((c, i) => ({
    providerParticipantId: c.sellerParticipantId,
    computeListingId: c.listingId,
    bidAmount: c.priceAmount * (1 + i * 0.1),
    currency: c.currency,
    estimatedStartLatencySec: 60 + i * 30,
    supportedPocwFormats: c.supportedPocwFormats,
    rationale: i === 0 ? "Best price + PoCW format match" : "Alternate capacity",
  }));
  job.status = "matched";
  job.updatedAt = nowIso();
}
