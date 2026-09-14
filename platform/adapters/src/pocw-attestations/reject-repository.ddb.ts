import type { RejectRepository } from "@cogbazaar/services/pocw-attestations";
import { attestationsById, envelope, jobsById, nowIso } from "../_shared/cogbazaar-sandbox-store.js";

export class RejectRepositoryDdb implements RejectRepository {
  constructor(private readonly dynamoClient: any) {}
  async rejectPoCWAttestation(input: Parameters<RejectRepository["rejectPoCWAttestation"]>[0]) {
    const raw = input as Record<string, unknown>;
    const att = attestationsById.get(String(raw.attestationId));
    if (!att) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    att.status = "rejected";
    att.accepted = false;
    att.rejectReason = String(raw.reason ?? "");
    att.reviewedAt = nowIso();
    const job = jobsById.get(att.jobId);
    if (job) {
      job.status = "disputed";
      job.disputeReason = att.rejectReason;
      job.updatedAt = nowIso();
    }
    return envelope(att, String(raw.correlationId ?? "")) as any;
  }
}
