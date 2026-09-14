/**
 * SuspendRepository - sandbox implementation.
 */

import type { SuspendRepository } from "@cogbazaar/services/listings";
import {
  envelope,
  listingsById,
  nowIso,
} from "../_shared/cogbazaar-sandbox-store.js";

export class SuspendRepositoryDdb implements SuspendRepository {
  constructor(private readonly dynamoClient: any) {}

  async suspendListing(
    input: Parameters<SuspendRepository["suspendListing"]>[0]
  ): Promise<Awaited<ReturnType<SuspendRepository["suspendListing"]>>> {
    const raw = input as Record<string, unknown>;
    const listing = listingsById.get(String(raw.listingId));
    if (!listing) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    listing.status = "suspended";
    listing.updatedAt = nowIso();
    return envelope(listing, String(raw.correlationId ?? "")) as any;
  }
}
