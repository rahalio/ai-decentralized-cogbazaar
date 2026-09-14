/**
 * Grant Pools Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/grant-pools.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DisbursementStatus = components["schemas"]["DisbursementStatus"];
export type GrantPool = components["schemas"]["GrantPool"];
export type GrantPoolListData = components["schemas"]["GrantPoolListData"];
export type GrantPoolStatus = components["schemas"]["GrantPoolStatus"];
export type MetricDeclaration = components["schemas"]["MetricDeclaration"];
export type PoolId = components["schemas"]["PoolId"];
export type ApproveDisbursementRequest = components["schemas"]["ApproveDisbursementRequest"];
export type DeclareMetricRequest = components["schemas"]["DeclareMetricRequest"];
export type GrantPoolCreateRequest = components["schemas"]["GrantPoolCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateGrantPoolRequestInput = NonNullable<operations["createGrantPool"]["requestBody"]>["content"]["application/json"];
export type DeclareGrantPoolMetricRequestInput = NonNullable<operations["declareGrantPoolMetric"]["requestBody"]>["content"]["application/json"];
export type ApproveGrantPoolDisbursementRequestInput = NonNullable<operations["approveGrantPoolDisbursement"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListGrantPoolsParams = NonNullable<operations["listGrantPools"]["parameters"]["query"]>;
export type GetGrantPoolParams = operations["getGrantPool"]["parameters"]["path"];
export type DeclareGrantPoolMetricParams = operations["declareGrantPoolMetric"]["parameters"]["path"];
export type ApproveGrantPoolDisbursementParams = operations["approveGrantPoolDisbursement"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListGrantPoolsResponse = operations["listGrantPools"]["responses"]["200"]["content"]["application/json"];
export type CreateGrantPoolResponse = operations["createGrantPool"]["responses"]["201"]["content"]["application/json"];
export type GetGrantPoolResponse = operations["getGrantPool"]["responses"]["200"]["content"]["application/json"];
export type DeclareGrantPoolMetricResponse = operations["declareGrantPoolMetric"]["responses"]["201"]["content"]["application/json"];
export type ApproveGrantPoolDisbursementResponse = operations["approveGrantPoolDisbursement"]["responses"]["200"]["content"]["application/json"];


