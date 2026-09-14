/**
 * Royalty Shares Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/royalty-shares.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type RoyaltyRole = components["schemas"]["RoyaltyRole"];
export type RoyaltyShare = components["schemas"]["RoyaltyShare"];
export type RoyaltyShareListData = components["schemas"]["RoyaltyShareListData"];
export type RoyaltyShareStatus = components["schemas"]["RoyaltyShareStatus"];
export type ShareId = components["schemas"]["ShareId"];
export type RoyaltyShareCreateRequest = components["schemas"]["RoyaltyShareCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateRoyaltyShareRequestInput = NonNullable<operations["createRoyaltyShare"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRoyaltySharesParams = NonNullable<operations["listRoyaltyShares"]["parameters"]["query"]>;
export type GetRoyaltyShareParams = operations["getRoyaltyShare"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRoyaltySharesResponse = operations["listRoyaltyShares"]["responses"]["200"]["content"]["application/json"];
export type CreateRoyaltyShareResponse = operations["createRoyaltyShare"]["responses"]["201"]["content"]["application/json"];
export type GetRoyaltyShareResponse = operations["getRoyaltyShare"]["responses"]["200"]["content"]["application/json"];


