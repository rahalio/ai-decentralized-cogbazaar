import type { ApproveDisbursementRepository } from "@cogbazaar/services/grant-pools";
import {
  declarationsById,
  envelope,
  grantPoolsById,
  nowIso,
} from "../_shared/cogbazaar-sandbox-store.js";

export class ApproveDisbursementRepositoryDdb implements ApproveDisbursementRepository {
  constructor(private readonly dynamoClient: any) {}
  async approveGrantPoolDisbursement(
    input: Parameters<ApproveDisbursementRepository["approveGrantPoolDisbursement"]>[0]
  ) {
    const raw = input as Record<string, unknown>;
    const decl = declarationsById.get(String(raw.declarationId));
    if (!decl) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    decl.status = "approved";
    decl.reviewedAt = nowIso();
    const pool = grantPoolsById.get(decl.poolId);
    if (pool) {
      pool.status = "disbursing";
      pool.updatedAt = nowIso();
    }
    return envelope(decl, String(raw.correlationId ?? "")) as any;
  }
}
