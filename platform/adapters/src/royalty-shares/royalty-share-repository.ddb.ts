import type { RoyaltyShareRepository } from "@cogbazaar/services/royalty-shares";
import {
  envelope,
  id,
  nowIso,
  royaltiesById,
  type SandboxRoyalty,
} from "../_shared/cogbazaar-sandbox-store.js";

export class RoyaltyShareRepositoryDdb implements RoyaltyShareRepository {
  constructor(private readonly dynamoClient: any) {}
  async listRoyaltyShares(input: Parameters<RoyaltyShareRepository["listRoyaltyShares"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...royaltiesById.values()];
    if (raw.jobId) items = items.filter((r) => r.jobId === raw.jobId);
    if (raw.role) items = items.filter((r) => r.role === raw.role);
    if (raw.periodKey) items = items.filter((r) => r.periodKey === raw.periodKey);
    if (raw.payeeParticipantId)
      items = items.filter((r) => r.payeeParticipantId === raw.payeeParticipantId);
    if (raw.status) items = items.filter((r) => r.status === raw.status);
    const totalAmount = items.reduce((s, r) => s + r.amount, 0);
    return envelope(
      { items, periodKey: raw.periodKey, totalAmount },
      String(raw.correlationId ?? "")
    ) as any;
  }
  async createRoyaltyShare(input: Parameters<RoyaltyShareRepository["createRoyaltyShare"]>[0]) {
    const raw = input as Record<string, unknown>;
    const share: SandboxRoyalty = {
      shareId: id("ryl"),
      jobId: String(raw.jobId),
      payeeParticipantId: String(raw.payeeParticipantId),
      role: (raw.role as SandboxRoyalty["role"]) ?? "kernel",
      shareBps: Number(raw.shareBps ?? 0),
      amount: Number(raw.amount ?? 0),
      currency: String(raw.currency ?? "USD"),
      status: (raw.status as SandboxRoyalty["status"]) ?? "pending",
      periodKey: raw.periodKey as string | undefined,
      createdAt: nowIso(),
    };
    royaltiesById.set(share.shareId, share);
    return envelope(share, String(raw.correlationId ?? "")) as any;
  }
  async getRoyaltyShare(input: Parameters<RoyaltyShareRepository["getRoyaltyShare"]>[0]) {
    const raw = input as Record<string, unknown>;
    const share = royaltiesById.get(String(raw.shareId));
    if (!share) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    return envelope(share, String(raw.correlationId ?? "")) as any;
  }
}
