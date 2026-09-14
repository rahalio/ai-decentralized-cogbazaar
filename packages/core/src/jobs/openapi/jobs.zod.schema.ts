import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createJob_Body = z
  .object({
    buyerParticipantId: z.string(),
    agentBuyer: z.boolean().optional(),
    datasetListingId: z.string().optional(),
    kernelListingId: z.string().optional(),
    computeListingId: z.string().optional(),
    computeToData: z.boolean().optional(),
    budgetAmount: z.number(),
    currency: z.string(),
    takeRateBps: z.number().int().optional(),
    containerSpec: z.string().optional(),
  })
  .passthrough();
const updateJob_Body = z
  .object({
    datasetListingId: z.string(),
    kernelListingId: z.string(),
    computeListingId: z.string(),
    computeToData: z.boolean(),
    budgetAmount: z.number(),
    currency: z.string(),
    takeRateBps: z.number().int(),
    containerSpec: z.string(),
    agentBuyer: z.boolean(),
  })
  .partial()
  .passthrough();
const acceptJobRoute_Body = z
  .object({
    providerParticipantId: z.string(),
    computeListingId: z.string().optional(),
  })
  .passthrough();
const JobStatus = z.enum([
  'draft',
  'matching',
  'matched',
  'running',
  'pocwPending',
  'settled',
  'disputed',
  'refunded',
  'cancelled',
]);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const JobId = z.string();
const ProviderBid = z
  .object({
    providerParticipantId: z.string(),
    computeListingId: z.string(),
    bidAmount: z.number(),
    currency: z.string(),
    estimatedStartLatencySec: z.number().int().optional(),
    supportedPocwFormats: z.array(z.string()).optional(),
    rationale: z.string().optional(),
  })
  .passthrough();
const Job = z
  .object({
    jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
    buyerParticipantId: z.string(),
    agentBuyer: z.boolean().optional(),
    datasetListingId: z.string().optional(),
    kernelListingId: z.string().optional(),
    computeListingId: z.string().optional(),
    computeToData: z.boolean().optional(),
    status: z.enum([
      'draft',
      'matching',
      'matched',
      'running',
      'pocwPending',
      'settled',
      'disputed',
      'refunded',
      'cancelled',
    ]),
    budgetAmount: z.number(),
    currency: z.string(),
    takeRateBps: z.number().int().optional(),
    containerSpec: z.string().optional(),
    bids: z
      .array(
        z
          .object({
            providerParticipantId: z.string(),
            computeListingId: z.string(),
            bidAmount: z.number(),
            currency: z.string(),
            estimatedStartLatencySec: z.number().int().optional(),
            supportedPocwFormats: z.array(z.string()).optional(),
            rationale: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    selectedProviderParticipantId: z.string().optional(),
    disputeReason: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const JobListData = z
  .object({
    items: z.array(
      z
        .object({
          jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
          buyerParticipantId: z.string(),
          agentBuyer: z.boolean().optional(),
          datasetListingId: z.string().optional(),
          kernelListingId: z.string().optional(),
          computeListingId: z.string().optional(),
          computeToData: z.boolean().optional(),
          status: z.enum([
            'draft',
            'matching',
            'matched',
            'running',
            'pocwPending',
            'settled',
            'disputed',
            'refunded',
            'cancelled',
          ]),
          budgetAmount: z.number(),
          currency: z.string(),
          takeRateBps: z.number().int().optional(),
          containerSpec: z.string().optional(),
          bids: z
            .array(
              z
                .object({
                  providerParticipantId: z.string(),
                  computeListingId: z.string(),
                  bidAmount: z.number(),
                  currency: z.string(),
                  estimatedStartLatencySec: z.number().int().optional(),
                  supportedPocwFormats: z.array(z.string()).optional(),
                  rationale: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          selectedProviderParticipantId: z.string().optional(),
          disputeReason: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const JobListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
              buyerParticipantId: z.string(),
              agentBuyer: z.boolean().optional(),
              datasetListingId: z.string().optional(),
              kernelListingId: z.string().optional(),
              computeListingId: z.string().optional(),
              computeToData: z.boolean().optional(),
              status: z.enum([
                'draft',
                'matching',
                'matched',
                'running',
                'pocwPending',
                'settled',
                'disputed',
                'refunded',
                'cancelled',
              ]),
              budgetAmount: z.number(),
              currency: z.string(),
              takeRateBps: z.number().int().optional(),
              containerSpec: z.string().optional(),
              bids: z
                .array(
                  z
                    .object({
                      providerParticipantId: z.string(),
                      computeListingId: z.string(),
                      bidAmount: z.number(),
                      currency: z.string(),
                      estimatedStartLatencySec: z.number().int().optional(),
                      supportedPocwFormats: z.array(z.string()).optional(),
                      rationale: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              selectedProviderParticipantId: z.string().optional(),
              disputeReason: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const JobCreateRequest = z
  .object({
    buyerParticipantId: z.string(),
    agentBuyer: z.boolean().optional(),
    datasetListingId: z.string().optional(),
    kernelListingId: z.string().optional(),
    computeListingId: z.string().optional(),
    computeToData: z.boolean().optional(),
    budgetAmount: z.number(),
    currency: z.string(),
    takeRateBps: z.number().int().optional(),
    containerSpec: z.string().optional(),
  })
  .passthrough();
const JobResponse = z
  .object({
    data: z
      .object({
        jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
        buyerParticipantId: z.string(),
        agentBuyer: z.boolean().optional(),
        datasetListingId: z.string().optional(),
        kernelListingId: z.string().optional(),
        computeListingId: z.string().optional(),
        computeToData: z.boolean().optional(),
        status: z.enum([
          'draft',
          'matching',
          'matched',
          'running',
          'pocwPending',
          'settled',
          'disputed',
          'refunded',
          'cancelled',
        ]),
        budgetAmount: z.number(),
        currency: z.string(),
        takeRateBps: z.number().int().optional(),
        containerSpec: z.string().optional(),
        bids: z
          .array(
            z
              .object({
                providerParticipantId: z.string(),
                computeListingId: z.string(),
                bidAmount: z.number(),
                currency: z.string(),
                estimatedStartLatencySec: z.number().int().optional(),
                supportedPocwFormats: z.array(z.string()).optional(),
                rationale: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        selectedProviderParticipantId: z.string().optional(),
        disputeReason: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const JobUpdateRequest = z
  .object({
    datasetListingId: z.string(),
    kernelListingId: z.string(),
    computeListingId: z.string(),
    computeToData: z.boolean(),
    budgetAmount: z.number(),
    currency: z.string(),
    takeRateBps: z.number().int(),
    containerSpec: z.string(),
    agentBuyer: z.boolean(),
  })
  .partial()
  .passthrough();
const MatchJobRequest = z
  .object({ widenSpec: z.boolean() })
  .partial()
  .passthrough();
const AcceptRouteRequest = z
  .object({
    providerParticipantId: z.string(),
    computeListingId: z.string().optional(),
  })
  .passthrough();
const DisputeJobRequest = z.object({ reason: z.string().min(1) }).passthrough();

export const schemas: any = {
  createJob_Body,
  updateJob_Body,
  acceptJobRoute_Body,
  JobStatus,
  Problem,
  JobId,
  ProviderBid,
  Job,
  JobListData,
  ResponseMeta,
  JobListResponse,
  JobCreateRequest,
  JobResponse,
  JobUpdateRequest,
  MatchJobRequest,
  AcceptRouteRequest,
  DisputeJobRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/jobs',
    alias: 'listJobs',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum([
            'draft',
            'matching',
            'matched',
            'running',
            'pocwPending',
            'settled',
            'disputed',
            'refunded',
            'cancelled',
          ])
          .optional(),
      },
      {
        name: 'buyerParticipantId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
                  buyerParticipantId: z.string(),
                  agentBuyer: z.boolean().optional(),
                  datasetListingId: z.string().optional(),
                  kernelListingId: z.string().optional(),
                  computeListingId: z.string().optional(),
                  computeToData: z.boolean().optional(),
                  status: z.enum([
                    'draft',
                    'matching',
                    'matched',
                    'running',
                    'pocwPending',
                    'settled',
                    'disputed',
                    'refunded',
                    'cancelled',
                  ]),
                  budgetAmount: z.number(),
                  currency: z.string(),
                  takeRateBps: z.number().int().optional(),
                  containerSpec: z.string().optional(),
                  bids: z
                    .array(
                      z
                        .object({
                          providerParticipantId: z.string(),
                          computeListingId: z.string(),
                          bidAmount: z.number(),
                          currency: z.string(),
                          estimatedStartLatencySec: z.number().int().optional(),
                          supportedPocwFormats: z.array(z.string()).optional(),
                          rationale: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  selectedProviderParticipantId: z.string().optional(),
                  disputeReason: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/jobs',
    alias: 'createJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createJob_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/jobs/:jobId',
    alias: 'getJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'patch',
    path: '/v1/jobs/:jobId',
    alias: 'updateJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateJob_Body,
      },
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/jobs/:jobId/accept-route',
    alias: 'acceptJobRoute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: acceptJobRoute_Body,
      },
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/jobs/:jobId/cancel',
    alias: 'cancelJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/jobs/:jobId/dispute',
    alias: 'disputeJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string().min(1) }).passthrough(),
      },
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/jobs/:jobId/match',
    alias: 'matchJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ widenSpec: z.boolean() })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/jobs/:jobId/refund',
    alias: 'refundJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^job_[0-9A-HJKMNP-TV-Z]{26}$/),
            buyerParticipantId: z.string(),
            agentBuyer: z.boolean().optional(),
            datasetListingId: z.string().optional(),
            kernelListingId: z.string().optional(),
            computeListingId: z.string().optional(),
            computeToData: z.boolean().optional(),
            status: z.enum([
              'draft',
              'matching',
              'matched',
              'running',
              'pocwPending',
              'settled',
              'disputed',
              'refunded',
              'cancelled',
            ]),
            budgetAmount: z.number(),
            currency: z.string(),
            takeRateBps: z.number().int().optional(),
            containerSpec: z.string().optional(),
            bids: z
              .array(
                z
                  .object({
                    providerParticipantId: z.string(),
                    computeListingId: z.string(),
                    bidAmount: z.number(),
                    currency: z.string(),
                    estimatedStartLatencySec: z.number().int().optional(),
                    supportedPocwFormats: z.array(z.string()).optional(),
                    rationale: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            selectedProviderParticipantId: z.string().optional(),
            disputeReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
