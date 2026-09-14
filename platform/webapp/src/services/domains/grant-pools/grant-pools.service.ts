import { apiGet, apiPost, apiPatch } from "../../../lib/api-client";

export const grantPoolsService = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<{ items: unknown[] }>("/v1/grant-pools", params),
  get: (id: string) => apiGet("/v1/grant-pools/" + id),
  create: (body: unknown) => apiPost("/v1/grant-pools", body),

  declareMetric: (poolId: string, body: unknown) => apiPost(`/v1/grant-pools/${poolId}/declare-metric`, body),
  approveDisbursement: (poolId: string, body: unknown) => apiPost(`/v1/grant-pools/${poolId}/approve-disbursement`, body),
};
