import type { ExportPackRepository } from "@cogbazaar/services/pocw-attestations";
import { attestationsById, envelope, id, nowIso } from "../_shared/cogbazaar-sandbox-store.js";

export class PackRepositoryDdb implements ExportPackRepository {
  constructor(private readonly dynamoClient: any) {}
  async exportPoCWAttestationPack(input: Parameters<ExportPackRepository["exportPoCWAttestationPack"]>[0]) {
    const raw = input as Record<string, unknown>;
    const att = attestationsById.get(String(raw.attestationId));
    if (!att) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    att.status = "exportReady";
    att.exportPackUrl = `sandbox://pocw-packs/${att.attestationId}.json`;
    const pack = {
      attestationId: att.attestationId,
      packDigest: id("dig"),
      exportPackUrl: att.exportPackUrl,
      exportedAt: nowIso(),
    };
    return envelope(pack, String(raw.correlationId ?? "")) as any;
  }
}
