import type { DisputeRepository } from "@cogbazaar/services/jobs";
import { envelope, nowIso } from "../_shared/cogbazaar-sandbox-store.js";
import { requireJob } from "./job-repository.ddb.js";

export class DisputeRepositoryDdb implements DisputeRepository {
  constructor(private readonly dynamoClient: any) {}
  async disputeJob(input: Parameters<DisputeRepository["disputeJob"]>[0]) {
    const raw = input as Record<string, unknown>;
    const job = requireJob(String(raw.jobId));
    job.status = "disputed";
    job.disputeReason = String(raw.reason ?? "");
    job.updatedAt = nowIso();
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }
}
