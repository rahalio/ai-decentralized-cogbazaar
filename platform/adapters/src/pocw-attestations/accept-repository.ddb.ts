import type { AcceptRepository } from "@cogbazaar/services/pocw-attestations";
import { attestationsById, envelope, jobsById, nowIso } from "../_shared/cogbazaar-sandbox-store.js";

export class AcceptRepositoryDdb implements AcceptRepository {
  constructor(private readonly dynamoClient: any) {}
  async acceptPoCWAttestation(input: Parameters<AcceptRepository["acceptPoCWAttestation"]>[0]) {
    const raw = input as Record<string, unknown>;
    const att = attestationsById.get(String(raw.attestationId));
    if (!att) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    att.status = "accepted";
    att.accepted = true;
    att.reviewedAt = nowIso();
    const job = jobsById.get(att.jobId);
    if (job) {
      job.status = "settled";
      job.updatedAt = nowIso();
    }
    return envelope(att, String(raw.correlationId ?? "")) as any;
  }
}
