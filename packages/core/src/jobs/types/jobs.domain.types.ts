/**
 * Jobs Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/jobs.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Job = components["schemas"]["Job"];
export type JobId = components["schemas"]["JobId"];
export type JobListData = components["schemas"]["JobListData"];
export type ProviderBid = components["schemas"]["ProviderBid"];
export type AcceptRouteRequest = components["schemas"]["AcceptRouteRequest"];
export type DisputeJobRequest = components["schemas"]["DisputeJobRequest"];
export type JobCreateRequest = components["schemas"]["JobCreateRequest"];
export type JobUpdateRequest = components["schemas"]["JobUpdateRequest"];
export type MatchJobRequest = components["schemas"]["MatchJobRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateJobRequestInput = NonNullable<operations["createJob"]["requestBody"]>["content"]["application/json"];
export type UpdateJobRequestInput = NonNullable<operations["updateJob"]["requestBody"]>["content"]["application/json"];
export type UpdateJobRequest = UpdateJobRequestInput;
export type MatchJobRequestInput = NonNullable<operations["matchJob"]["requestBody"]>["content"]["application/json"];
export type AcceptJobRouteRequestInput = NonNullable<operations["acceptJobRoute"]["requestBody"]>["content"]["application/json"];
export type DisputeJobRequestInput = NonNullable<operations["disputeJob"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListJobsParams = NonNullable<operations["listJobs"]["parameters"]["query"]>;
export type GetJobParams = operations["getJob"]["parameters"]["path"];
export type UpdateJobParams = operations["updateJob"]["parameters"]["path"];
export type MatchJobParams = operations["matchJob"]["parameters"]["path"];
export type AcceptJobRouteParams = operations["acceptJobRoute"]["parameters"]["path"];
export type CancelJobParams = operations["cancelJob"]["parameters"]["path"];
export type DisputeJobParams = operations["disputeJob"]["parameters"]["path"];
export type RefundJobParams = operations["refundJob"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListJobsResponse = operations["listJobs"]["responses"]["200"]["content"]["application/json"];
export type CreateJobResponse = operations["createJob"]["responses"]["201"]["content"]["application/json"];
export type GetJobResponse = operations["getJob"]["responses"]["200"]["content"]["application/json"];
export type UpdateJobResponse = operations["updateJob"]["responses"]["200"]["content"]["application/json"];
export type MatchJobResponse = operations["matchJob"]["responses"]["200"]["content"]["application/json"];
export type AcceptJobRouteResponse = operations["acceptJobRoute"]["responses"]["200"]["content"]["application/json"];
export type CancelJobResponse = operations["cancelJob"]["responses"]["200"]["content"]["application/json"];
export type DisputeJobResponse = operations["disputeJob"]["responses"]["200"]["content"]["application/json"];
export type RefundJobResponse = operations["refundJob"]["responses"]["200"]["content"]["application/json"];


