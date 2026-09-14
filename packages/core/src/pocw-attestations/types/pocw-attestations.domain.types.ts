/**
 * Pocw Attestations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/pocw-attestations.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AttestationId = components["schemas"]["AttestationId"];
export type AttestationStatus = components["schemas"]["AttestationStatus"];
export type PoCWAttestation = components["schemas"]["PoCWAttestation"];
export type PoCWAttestationListData = components["schemas"]["PoCWAttestationListData"];
export type PoCWExportPack = components["schemas"]["PoCWExportPack"];
export type PoCWAttestationCreateRequest = components["schemas"]["PoCWAttestationCreateRequest"];
export type PoCWReviewRequest = components["schemas"]["PoCWReviewRequest"];
export type PocwAttestation = operations["listPoCWAttestations"]["responses"]["200"]["content"]["application/json"]["data"];
export type ExportPack = operations["exportPoCWAttestationPack"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitPoCWAttestationRequestInput = NonNullable<operations["submitPoCWAttestation"]["requestBody"]>["content"]["application/json"];
export type AcceptPoCWAttestationRequestInput = NonNullable<operations["acceptPoCWAttestation"]["requestBody"]>["content"]["application/json"];
export type RejectPoCWAttestationRequestInput = NonNullable<operations["rejectPoCWAttestation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPoCWAttestationsParams = NonNullable<operations["listPoCWAttestations"]["parameters"]["query"]>;
export type GetPoCWAttestationParams = operations["getPoCWAttestation"]["parameters"]["path"];
export type AcceptPoCWAttestationParams = operations["acceptPoCWAttestation"]["parameters"]["path"];
export type RejectPoCWAttestationParams = operations["rejectPoCWAttestation"]["parameters"]["path"];
export type ExportPoCWAttestationPackParams = operations["exportPoCWAttestationPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPoCWAttestationsResponse = operations["listPoCWAttestations"]["responses"]["200"]["content"]["application/json"];
export type SubmitPoCWAttestationResponse = operations["submitPoCWAttestation"]["responses"]["201"]["content"]["application/json"];
export type GetPoCWAttestationResponse = operations["getPoCWAttestation"]["responses"]["200"]["content"]["application/json"];
export type AcceptPoCWAttestationResponse = operations["acceptPoCWAttestation"]["responses"]["200"]["content"]["application/json"];
export type RejectPoCWAttestationResponse = operations["rejectPoCWAttestation"]["responses"]["200"]["content"]["application/json"];
export type ExportPoCWAttestationPackResponse = operations["exportPoCWAttestationPack"]["responses"]["200"]["content"]["application/json"];


