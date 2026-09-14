import { apiGet, apiPost, apiPatch } from "../../../lib/api-client";

export const policyRulesService = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<{ items: unknown[] }>("/v1/policy-rules", params),
  get: (id: string) => apiGet("/v1/policy-rules/" + id),
  create: (body: unknown) => apiPost("/v1/policy-rules", body),
};
