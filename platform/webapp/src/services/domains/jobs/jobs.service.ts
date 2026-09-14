import { apiGet, apiPost, apiPatch } from "../../../lib/api-client";

export const jobsService = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<{ items: unknown[] }>("/v1/jobs", params),
  get: (id: string) => apiGet("/v1/jobs/" + id),
  create: (body: unknown) => apiPost("/v1/jobs", body),

  match: (jobId: string, body?: unknown) => apiPost(`/v1/jobs/${jobId}/match`, body ?? {}),
  acceptRoute: (jobId: string, body: unknown) => apiPost(`/v1/jobs/${jobId}/accept-route`, body),
  cancel: (jobId: string) => apiPost(`/v1/jobs/${jobId}/cancel`),
  dispute: (jobId: string, body: unknown) => apiPost(`/v1/jobs/${jobId}/dispute`, body),
  refund: (jobId: string) => apiPost(`/v1/jobs/${jobId}/refund`),
  update: (jobId: string, body: unknown) => apiPatch(`/v1/jobs/${jobId}`, body),
};
