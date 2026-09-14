import { apiGet, apiPost, apiPatch } from "../../../lib/api-client";

export const pocwAttestationsService = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<{ items: unknown[] }>("/v1/pocw-attestations", params),
  get: (id: string) => apiGet("/v1/pocw-attestations/" + id),
  create: (body: unknown) => apiPost("/v1/pocw-attestations", body),

  accept: (attestationId: string, body?: unknown) => apiPost(`/v1/pocw-attestations/${attestationId}/accept`, body ?? {}),
  reject: (attestationId: string, body: unknown) => apiPost(`/v1/pocw-attestations/${attestationId}/reject`, body),
  exportPack: (attestationId: string) => apiPost(`/v1/pocw-attestations/${attestationId}/export-pack`),
};
