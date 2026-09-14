/**
 * Postman-collection 1:1 Vitest tests for policy-rules (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  dualUseQueue: "",
  limit: "",
  ruleId: "",
  ruleType: "",
  status: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / policy-rules (1:1 generated)", () => {

  it("listPolicyRules", async () => {
    const url = sub("{{baseUrl}}/v1/policy-rules?cursor={{cursor}}&limit={{limit}}&ruleType={{ruleType}}&status={{status}}&dualUseQueue={{dualUseQueue}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createPolicyRule", async () => {
    const url = sub("{{baseUrl}}/v1/policy-rules");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"ruleType\": \"dualUseBlock\",\n  \"status\": \"active\",\n  \"expression\": \"\",\n  \"targetListingId\": \"newman_targetListingId\",\n  \"agentAccountId\": \"newman_agentAccountId\",\n  \"spendCapAmount\": 0,\n  \"spendCapCurrency\": \"\",\n  \"dualUseQueue\": false\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['policyRuleId'] = j.data.id;
  });

  it("getPolicyRule", async () => {
    const url = sub("{{baseUrl}}/v1/policy-rules/{{ruleId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
