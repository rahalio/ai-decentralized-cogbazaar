import type { PocwAttestationRepository } from "@cogbazaar/services/pocw-attestations";
import {
  attestationsById,
  envelope,
  id,
  nowIso,
  type SandboxAttestation,
} from "../_shared/cogbazaar-sandbox-store.js";

export class PocwAttestationRepositoryDdb implements PocwAttestationRepository {
  constructor(private readonly dynamoClient: any) {}
  async listPoCWAttestations(input: Parameters<PocwAttestationRepository["listPoCWAttestations"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...attestationsById.values()];
    if (raw.jobId) items = items.filter((a) => a.jobId === raw.jobId);
    if (raw.status) items = items.filter((a) => a.status === raw.status);
    return envelope({ items }, String(raw.correlationId ?? "")) as any;
  }
  async submitPoCWAttestation(input: Parameters<PocwAttestationRepository["submitPoCWAttestation"]>[0]) {
    const raw = input as Record<string, unknown>;
    const att: SandboxAttestation = {
      attestationId: id("pcw"),
      jobId: String(raw.jobId),
      providerParticipantId: String(raw.providerParticipantId ?? ""),
      status: "pending",
      proofPayload: String(raw.proofPayload ?? ""),
      proofFormat: raw.proofFormat as string | undefined,
      submittedAt: nowIso(),
    };
    attestationsById.set(att.attestationId, att);
    return envelope(att, String(raw.correlationId ?? "")) as any;
  }
  async getPoCWAttestation(input: Parameters<PocwAttestationRepository["getPoCWAttestation"]>[0]) {
    const raw = input as Record<string, unknown>;
    const att = attestationsById.get(String(raw.attestationId));
    if (!att) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    return envelope(att, String(raw.correlationId ?? "")) as any;
  }
}
