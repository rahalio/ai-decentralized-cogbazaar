/**
 * Policy Rules Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policy-rules.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PolicyRule = components["schemas"]["PolicyRule"];
export type PolicyRuleListData = components["schemas"]["PolicyRuleListData"];
export type PolicyRuleStatus = components["schemas"]["PolicyRuleStatus"];
export type PolicyRuleType = components["schemas"]["PolicyRuleType"];
export type RuleId = components["schemas"]["RuleId"];
export type PolicyRuleCreateRequest = components["schemas"]["PolicyRuleCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePolicyRuleRequestInput = NonNullable<operations["createPolicyRule"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPolicyRulesParams = NonNullable<operations["listPolicyRules"]["parameters"]["query"]>;
export type GetPolicyRuleParams = operations["getPolicyRule"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPolicyRulesResponse = operations["listPolicyRules"]["responses"]["200"]["content"]["application/json"];
export type CreatePolicyRuleResponse = operations["createPolicyRule"]["responses"]["201"]["content"]["application/json"];
export type GetPolicyRuleResponse = operations["getPolicyRule"]["responses"]["200"]["content"]["application/json"];


