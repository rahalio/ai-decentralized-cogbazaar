import type { DeclareMetricRepository } from "@cogbazaar/services/grant-pools";
import {
  declarationsById,
  envelope,
  grantPoolsById,
  id,
  nowIso,
} from "../_shared/cogbazaar-sandbox-store.js";

export class DeclareMetricRepositoryDdb implements DeclareMetricRepository {
  constructor(private readonly dynamoClient: any) {}
  async declareGrantPoolMetric(input: Parameters<DeclareMetricRepository["declareGrantPoolMetric"]>[0]) {
    const raw = input as Record<string, unknown>;
    const poolId = String(raw.poolId);
    if (!grantPoolsById.has(poolId))
      throw Object.assign(new Error("Not found"), { statusCode: 404 });
    const decl = {
      declarationId: id("dcl"),
      poolId,
      claimantParticipantId: String(raw.claimantParticipantId ?? ""),
      metricValue: Number(raw.metricValue ?? 0),
      evidence: raw.evidence as string | undefined,
      status: "declared" as const,
      declaredAt: nowIso(),
    };
    declarationsById.set(decl.declarationId, decl);
    return envelope(decl, String(raw.correlationId ?? "")) as any;
  }
}
