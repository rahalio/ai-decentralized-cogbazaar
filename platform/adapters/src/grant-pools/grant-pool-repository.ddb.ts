import type { GrantPoolRepository } from "@cogbazaar/services/grant-pools";
import {
  envelope,
  grantPoolsById,
  id,
  nowIso,
  type SandboxGrantPool,
} from "../_shared/cogbazaar-sandbox-store.js";

export class GrantPoolRepositoryDdb implements GrantPoolRepository {
  constructor(private readonly dynamoClient: any) {}
  async listGrantPools(input: Parameters<GrantPoolRepository["listGrantPools"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...grantPoolsById.values()];
    if (raw.status) items = items.filter((p) => p.status === raw.status);
    return envelope({ items }, String(raw.correlationId ?? "")) as any;
  }
  async createGrantPool(input: Parameters<GrantPoolRepository["createGrantPool"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pool: SandboxGrantPool = {
      poolId: id("grp"),
      name: String(raw.name ?? "Pool"),
      metric: String(raw.metric ?? ""),
      budgetAmount: Number(raw.budgetAmount ?? 0),
      currency: String(raw.currency ?? "USD"),
      status: (raw.status as SandboxGrantPool["status"]) ?? "open",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    grantPoolsById.set(pool.poolId, pool);
    return envelope(pool, String(raw.correlationId ?? "")) as any;
  }
  async getGrantPool(input: Parameters<GrantPoolRepository["getGrantPool"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pool = grantPoolsById.get(String(raw.poolId));
    if (!pool) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    return envelope(pool, String(raw.correlationId ?? "")) as any;
  }
}
