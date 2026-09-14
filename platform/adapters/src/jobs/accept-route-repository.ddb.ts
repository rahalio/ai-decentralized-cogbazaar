import type { AcceptRouteRepository } from "@cogbazaar/services/jobs";
import { envelope, nowIso } from "../_shared/cogbazaar-sandbox-store.js";
import { requireJob } from "./job-repository.ddb.js";

export class AcceptRouteRepositoryDdb implements AcceptRouteRepository {
  constructor(private readonly dynamoClient: any) {}
  async acceptJobRoute(input: Parameters<AcceptRouteRepository["acceptJobRoute"]>[0]) {
    const raw = input as Record<string, unknown>;
    const job = requireJob(String(raw.jobId));
    job.selectedProviderParticipantId = String(raw.providerParticipantId ?? "");
    if (raw.computeListingId) job.computeListingId = String(raw.computeListingId);
    job.status = "running";
    job.updatedAt = nowIso();
    return envelope(job, String(raw.correlationId ?? "")) as any;
  }
}
