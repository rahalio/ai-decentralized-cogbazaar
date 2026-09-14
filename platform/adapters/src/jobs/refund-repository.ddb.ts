import type { RefundRepository } from "@cogbazaar/services/jobs";
import { envelope, nowIso } from "../_shared/cogbazaar-sandbox-store.js";
import { requireJob } from "./job-repository.ddb.js";

export class RefundRepositoryDdb implements RefundRepository {
  constructor(private readonly dynamoClient: any) {}
  async refundJob(input: Parameters<RefundRepository["refundJob"]>[0]) {
    const raw = input as Record<string, unknown>;
    const job = requireJob(String(raw.jobId));
    job.status = "refunded";
    job.updatedAt = nowIso();
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }
}
