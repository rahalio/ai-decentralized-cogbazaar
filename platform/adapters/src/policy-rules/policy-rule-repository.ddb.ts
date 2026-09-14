import type { PolicyRuleRepository } from "@cogbazaar/services/policy-rules";
import {
  envelope,
  id,
  nowIso,
  policyRulesById,
  type SandboxPolicyRule,
} from "../_shared/cogbazaar-sandbox-store.js";

export class PolicyRuleRepositoryDdb implements PolicyRuleRepository {
  constructor(private readonly dynamoClient: any) {}
  async listPolicyRules(input: Parameters<PolicyRuleRepository["listPolicyRules"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...policyRulesById.values()];
    if (raw.ruleType) items = items.filter((r) => r.ruleType === raw.ruleType);
    if (raw.status) items = items.filter((r) => r.status === raw.status);
    if (typeof raw.dualUseQueue === "boolean")
      items = items.filter((r) => Boolean(r.dualUseQueue) === raw.dualUseQueue);
    return envelope({ items }, String(raw.correlationId ?? "")) as any;
  }
  async createPolicyRule(input: Parameters<PolicyRuleRepository["createPolicyRule"]>[0]) {
    const raw = input as Record<string, unknown>;
    const rule: SandboxPolicyRule = {
      ruleId: id("pol"),
      ruleType: (raw.ruleType as SandboxPolicyRule["ruleType"]) ?? "licenceGate",
      status: (raw.status as SandboxPolicyRule["status"]) ?? "active",
      expression: String(raw.expression ?? ""),
      targetListingId: raw.targetListingId as string | undefined,
      agentAccountId: raw.agentAccountId as string | undefined,
      spendCapAmount: raw.spendCapAmount as number | undefined,
      spendCapCurrency: raw.spendCapCurrency as string | undefined,
      dualUseQueue: Boolean(raw.dualUseQueue),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    policyRulesById.set(rule.ruleId, rule);
    return envelope(rule, String(raw.correlationId ?? "")) as any;
  }
  async getPolicyRule(input: Parameters<PolicyRuleRepository["getPolicyRule"]>[0]) {
    const raw = input as Record<string, unknown>;
    const rule = policyRulesById.get(String(raw.ruleId));
    if (!rule) throw Object.assign(new Error("Not found"), { statusCode: 404 });
    return envelope(rule, String(raw.correlationId ?? "")) as any;
  }
}
