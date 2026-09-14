/**
 * Listings Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/listings.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type LicenceClass = components["schemas"]["LicenceClass"];
export type Listing = components["schemas"]["Listing"];
export type ListingId = components["schemas"]["ListingId"];
export type ListingListData = components["schemas"]["ListingListData"];
export type ListingStatus = components["schemas"]["ListingStatus"];
export type ListingType = components["schemas"]["ListingType"];
export type ListingCreateRequest = components["schemas"]["ListingCreateRequest"];
export type ListingUpdateRequest = components["schemas"]["ListingUpdateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateListingRequestInput = NonNullable<operations["createListing"]["requestBody"]>["content"]["application/json"];
export type UpdateListingRequestInput = NonNullable<operations["updateListing"]["requestBody"]>["content"]["application/json"];
export type UpdateListingRequest = UpdateListingRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListListingsParams = NonNullable<operations["listListings"]["parameters"]["query"]>;
export type GetListingParams = operations["getListing"]["parameters"]["path"];
export type UpdateListingParams = operations["updateListing"]["parameters"]["path"];
export type SuspendListingParams = operations["suspendListing"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListListingsResponse = operations["listListings"]["responses"]["200"]["content"]["application/json"];
export type CreateListingResponse = operations["createListing"]["responses"]["201"]["content"]["application/json"];
export type GetListingResponse = operations["getListing"]["responses"]["200"]["content"]["application/json"];
export type UpdateListingResponse = operations["updateListing"]["responses"]["200"]["content"]["application/json"];
export type SuspendListingResponse = operations["suspendListing"]["responses"]["200"]["content"]["application/json"];


