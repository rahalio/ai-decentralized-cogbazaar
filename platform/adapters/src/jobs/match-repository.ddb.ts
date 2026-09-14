import type { MatchRepository } from "@cogbazaar/services/jobs";
import { envelope, nowIso } from "../_shared/cogbazaar-sandbox-store.js";
import { requireJob, seedBids } from "./job-repository.ddb.js";

export class MatchRepositoryDdb implements MatchRepository {
  constructor(private readonly dynamoClient: any) {}
  async matchJob(input: Parameters<MatchRepository["matchJob"]>[0]) {
    const raw = input as Record<string, unknown>;
    const job = requireJob(String(raw.jobId));
    job.status = "matching";
    seedBids(job);
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }
}
