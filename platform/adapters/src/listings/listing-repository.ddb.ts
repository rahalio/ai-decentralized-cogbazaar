/**
 * ListingRepository - sandbox implementation for Cogbazaar demo.
 */

import type { ListingRepository } from "@cogbazaar/services/listings";
import {
  envelope,
  id,
  listingsById,
  nowIso,
  type SandboxListing,
} from "../_shared/cogbazaar-sandbox-store.js";

export class ListingRepositoryDdb implements ListingRepository {
  constructor(private readonly dynamoClient: any) {}

  async listListings(
    input: Parameters<ListingRepository["listListings"]>[0]
  ): Promise<Awaited<ReturnType<ListingRepository["listListings"]>>> {
    const raw = input as Record<string, unknown>;
    let items = [...listingsById.values()];
    if (raw.listingType) items = items.filter((l) => l.listingType === raw.listingType);
    if (raw.licenceClass) items = items.filter((l) => l.licenceClass === raw.licenceClass);
    if (typeof raw.dualUseFlag === "boolean")
      items = items.filter((l) => Boolean(l.dualUseFlag) === raw.dualUseFlag);
    if (raw.status) items = items.filter((l) => l.status === raw.status);
    return envelope({ items }, String(raw.correlationId ?? "")) as any;
  }

  async createListing(
    input: Parameters<ListingRepository["createListing"]>[0]
  ): Promise<Awaited<ReturnType<ListingRepository["createListing"]>>> {
    const raw = input as Record<string, unknown>;
    const t = nowIso();
    const listing: SandboxListing = {
      listingId: id("lst"),
      listingType: (raw.listingType as SandboxListing["listingType"]) ?? "dataset",
      sellerParticipantId: String(raw.sellerParticipantId ?? "prt_unknown"),
      title: raw.title as string | undefined,
      priceAmount: Number(raw.priceAmount ?? 0),
      currency: String(raw.currency ?? "USD"),
      status: (raw.status as SandboxListing["status"]) ?? "active",
      licenceClass: raw.licenceClass as SandboxListing["licenceClass"],
      dualUseFlag: Boolean(raw.dualUseFlag),
      computeToDataEligible: Boolean(raw.computeToDataEligible),
      supportedPocwFormats: raw.supportedPocwFormats as string[] | undefined,
      takeRateBps: raw.takeRateBps as number | undefined,
      createdAt: t,
      updatedAt: t,
    };
    listingsById.set(listing.listingId, listing);
    return envelope(listing, String(raw.correlationId ?? "")) as any;
  }

  async getListing(
    input: Parameters<ListingRepository["getListing"]>[0]
  ): Promise<Awaited<ReturnType<ListingRepository["getListing"]>>> {
    const raw = input as Record<string, unknown>;
    const listing = listingsById.get(String(raw.listingId));
    if (!listing) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    return envelope(listing, String(raw.correlationId ?? "")) as any;
  }

  async updateListing(
    input: Parameters<ListingRepository["updateListing"]>[0]
  ): Promise<Awaited<ReturnType<ListingRepository["updateListing"]>>> {
    const raw = input as Record<string, unknown>;
    const listing = listingsById.get(String(raw.listingId));
    if (!listing) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    Object.assign(listing, {
      title: raw.title ?? listing.title,
      priceAmount: raw.priceAmount ?? listing.priceAmount,
      currency: raw.currency ?? listing.currency,
      status: raw.status ?? listing.status,
      licenceClass: raw.licenceClass ?? listing.licenceClass,
      dualUseFlag: raw.dualUseFlag ?? listing.dualUseFlag,
      computeToDataEligible: raw.computeToDataEligible ?? listing.computeToDataEligible,
      supportedPocwFormats: raw.supportedPocwFormats ?? listing.supportedPocwFormats,
      takeRateBps: raw.takeRateBps ?? listing.takeRateBps,
      updatedAt: nowIso(),
    });
    return envelope(listing, String(raw.correlationId ?? "")) as any;
  }
}
