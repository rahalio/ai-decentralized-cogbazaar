import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createGrantPool_Body = z
  .object({
    name: z.string(),
    metric: z.string(),
    budgetAmount: z.number(),
    currency: z.string(),
    status: z.enum(['open', 'disbursing', 'closed']).optional(),
  })
  .passthrough();
const declareGrantPoolMetric_Body = z
  .object({
    claimantParticipantId: z.string(),
    metricValue: z.number(),
    evidence: z.string().optional(),
  })
  .passthrough();
const approveGrantPoolDisbursement_Body = z
  .object({ declarationId: z.string(), note: z.string().optional() })
  .passthrough();
const GrantPoolStatus = z.enum(['open', 'disbursing', 'closed']);
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
const PoolId = z.string();
const GrantPool = z
  .object({
    poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    metric: z.string(),
    budgetAmount: z.number(),
    currency: z.string(),
    status: z.enum(['open', 'disbursing', 'closed']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const GrantPoolListData = z
  .object({
    items: z.array(
      z
        .object({
          poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          metric: z.string(),
          budgetAmount: z.number(),
          currency: z.string(),
          status: z.enum(['open', 'disbursing', 'closed']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
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
const GrantPoolListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              metric: z.string(),
              budgetAmount: z.number(),
              currency: z.string(),
              status: z.enum(['open', 'disbursing', 'closed']),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const GrantPoolCreateRequest = z
  .object({
    name: z.string(),
    metric: z.string(),
    budgetAmount: z.number(),
    currency: z.string(),
    status: z.enum(['open', 'disbursing', 'closed']).optional(),
  })
  .passthrough();
const GrantPoolResponse = z
  .object({
    data: z
      .object({
        poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        metric: z.string(),
        budgetAmount: z.number(),
        currency: z.string(),
        status: z.enum(['open', 'disbursing', 'closed']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const DeclareMetricRequest = z
  .object({
    claimantParticipantId: z.string(),
    metricValue: z.number(),
    evidence: z.string().optional(),
  })
  .passthrough();
const DisbursementStatus = z.enum(['declared', 'approved', 'paid', 'rejected']);
const MetricDeclaration = z
  .object({
    declarationId: z.string(),
    poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
    claimantParticipantId: z.string(),
    metricValue: z.number(),
    evidence: z.string().optional(),
    status: z.enum(['declared', 'approved', 'paid', 'rejected']),
    declaredAt: z.string().datetime({ offset: true }),
    reviewedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const MetricDeclarationResponse = z
  .object({
    data: z
      .object({
        declarationId: z.string(),
        poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
        claimantParticipantId: z.string(),
        metricValue: z.number(),
        evidence: z.string().optional(),
        status: z.enum(['declared', 'approved', 'paid', 'rejected']),
        declaredAt: z.string().datetime({ offset: true }),
        reviewedAt: z.string().datetime({ offset: true }).optional(),
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
const ApproveDisbursementRequest = z
  .object({ declarationId: z.string(), note: z.string().optional() })
  .passthrough();

export const schemas: any = {
  createGrantPool_Body,
  declareGrantPoolMetric_Body,
  approveGrantPoolDisbursement_Body,
  GrantPoolStatus,
  Problem,
  PoolId,
  GrantPool,
  GrantPoolListData,
  ResponseMeta,
  GrantPoolListResponse,
  GrantPoolCreateRequest,
  GrantPoolResponse,
  DeclareMetricRequest,
  DisbursementStatus,
  MetricDeclaration,
  MetricDeclarationResponse,
  ApproveDisbursementRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/grant-pools',
    alias: 'listGrantPools',
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
        schema: z.enum(['open', 'disbursing', 'closed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  metric: z.string(),
                  budgetAmount: z.number(),
                  currency: z.string(),
                  status: z.enum(['open', 'disbursing', 'closed']),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/grant-pools',
    alias: 'createGrantPool',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createGrantPool_Body,
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
            poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            metric: z.string(),
            budgetAmount: z.number(),
            currency: z.string(),
            status: z.enum(['open', 'disbursing', 'closed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/grant-pools/:poolId',
    alias: 'getGrantPool',
    requestFormat: 'json',
    parameters: [
      {
        name: 'poolId',
        type: 'Path',
        schema: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            metric: z.string(),
            budgetAmount: z.number(),
            currency: z.string(),
            status: z.enum(['open', 'disbursing', 'closed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/grant-pools/:poolId/approve-disbursement',
    alias: 'approveGrantPoolDisbursement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: approveGrantPoolDisbursement_Body,
      },
      {
        name: 'poolId',
        type: 'Path',
        schema: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            declarationId: z.string(),
            poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
            claimantParticipantId: z.string(),
            metricValue: z.number(),
            evidence: z.string().optional(),
            status: z.enum(['declared', 'approved', 'paid', 'rejected']),
            declaredAt: z.string().datetime({ offset: true }),
            reviewedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/grant-pools/:poolId/declare-metric',
    alias: 'declareGrantPoolMetric',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: declareGrantPoolMetric_Body,
      },
      {
        name: 'poolId',
        type: 'Path',
        schema: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            declarationId: z.string(),
            poolId: z.string().regex(/^grp_[0-9A-HJKMNP-TV-Z]{26}$/),
            claimantParticipantId: z.string(),
            metricValue: z.number(),
            evidence: z.string().optional(),
            status: z.enum(['declared', 'approved', 'paid', 'rejected']),
            declaredAt: z.string().datetime({ offset: true }),
            reviewedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
