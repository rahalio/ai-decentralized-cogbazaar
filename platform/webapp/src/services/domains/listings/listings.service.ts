import { apiGet, apiPost, apiPatch } from "../../../lib/api-client";

export const listingsService = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<{ items: unknown[] }>("/v1/listings", params),
  get: (id: string) => apiGet("/v1/listings/" + id),
  create: (body: unknown) => apiPost("/v1/listings", body),

  update: (listingId: string, body: unknown) => apiPatch(`/v1/listings/${listingId}`, body),
  suspend: (listingId: string) => apiPost(`/v1/listings/${listingId}/suspend`),
};
