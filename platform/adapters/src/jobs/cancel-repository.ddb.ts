import type { CancelRepository } from "@cogbazaar/services/jobs";
import { envelope, nowIso } from "../_shared/cogbazaar-sandbox-store.js";
import { requireJob } from "./job-repository.ddb.js";

export class CancelRepositoryDdb implements CancelRepository {
  constructor(private readonly dynamoClient: any) {}
  async getJob(input: Parameters<CancelRepository["getJob"]>[0]) {
    const raw = input as Record<string, unknown>;
    try {
      return envelope(requireJob(String(raw.jobId)), String(raw.correlationId ?? "")) as any;
    } catch {
      return null;
    }
  }
  async cancelJob(input: Parameters<CancelRepository["cancelJob"]>[0]) {
    const raw = input as Record<string, unknown>;
    const job = requireJob(String(raw.jobId));
    job.status = "cancelled";
    job.updatedAt = nowIso();
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }
}
