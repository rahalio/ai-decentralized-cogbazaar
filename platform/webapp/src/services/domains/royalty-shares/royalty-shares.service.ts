import { apiGet, apiPost, apiPatch } from "../../../lib/api-client";

export const royaltySharesService = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<{ items: unknown[] }>("/v1/royalty-shares", params),
  get: (id: string) => apiGet("/v1/royalty-shares/" + id),
  create: (body: unknown) => apiPost("/v1/royalty-shares", body),
};
