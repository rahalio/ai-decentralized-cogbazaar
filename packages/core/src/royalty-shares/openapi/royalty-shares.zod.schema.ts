import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createRoyaltyShare_Body = z
  .object({
    jobId: z.string(),
    payeeParticipantId: z.string(),
    role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
    shareBps: z.number().int(),
    amount: z.number(),
    currency: z.string(),
    periodKey: z.string().optional(),
    status: z.enum(['pending', 'paid', 'clawedBack']).optional(),
  })
  .passthrough();
const RoyaltyRole = z.enum(['data', 'kernel', 'compute', 'marketplace']);
const RoyaltyShareStatus = z.enum(['pending', 'paid', 'clawedBack']);
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
const ShareId = z.string();
const RoyaltyShare = z
  .object({
    shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
    jobId: z.string(),
    payeeParticipantId: z.string(),
    role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
    shareBps: z.number().int().gte(0).lte(10000),
    amount: z.number(),
    currency: z.string(),
    status: z.enum(['pending', 'paid', 'clawedBack']),
    periodKey: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    paidAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RoyaltyShareListData = z
  .object({
    items: z.array(
      z
        .object({
          shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
          jobId: z.string(),
          payeeParticipantId: z.string(),
          role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
          shareBps: z.number().int().gte(0).lte(10000),
          amount: z.number(),
          currency: z.string(),
          status: z.enum(['pending', 'paid', 'clawedBack']),
          periodKey: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          paidAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
    periodKey: z.string().optional(),
    totalAmount: z.number().optional(),
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
const RoyaltyShareListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
              jobId: z.string(),
              payeeParticipantId: z.string(),
              role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
              shareBps: z.number().int().gte(0).lte(10000),
              amount: z.number(),
              currency: z.string(),
              status: z.enum(['pending', 'paid', 'clawedBack']),
              periodKey: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              paidAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
        periodKey: z.string().optional(),
        totalAmount: z.number().optional(),
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
const RoyaltyShareCreateRequest = z
  .object({
    jobId: z.string(),
    payeeParticipantId: z.string(),
    role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
    shareBps: z.number().int(),
    amount: z.number(),
    currency: z.string(),
    periodKey: z.string().optional(),
    status: z.enum(['pending', 'paid', 'clawedBack']).optional(),
  })
  .passthrough();
const RoyaltyShareResponse = z
  .object({
    data: z
      .object({
        shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
        jobId: z.string(),
        payeeParticipantId: z.string(),
        role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
        shareBps: z.number().int().gte(0).lte(10000),
        amount: z.number(),
        currency: z.string(),
        status: z.enum(['pending', 'paid', 'clawedBack']),
        periodKey: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        paidAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  createRoyaltyShare_Body,
  RoyaltyRole,
  RoyaltyShareStatus,
  Problem,
  ShareId,
  RoyaltyShare,
  RoyaltyShareListData,
  ResponseMeta,
  RoyaltyShareListResponse,
  RoyaltyShareCreateRequest,
  RoyaltyShareResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/royalty-shares',
    alias: 'listRoyaltyShares',
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
        name: 'jobId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'role',
        type: 'Query',
        schema: z.enum(['data', 'kernel', 'compute', 'marketplace']).optional(),
      },
      {
        name: 'periodKey',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'payeeParticipantId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['pending', 'paid', 'clawedBack']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  jobId: z.string(),
                  payeeParticipantId: z.string(),
                  role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
                  shareBps: z.number().int().gte(0).lte(10000),
                  amount: z.number(),
                  currency: z.string(),
                  status: z.enum(['pending', 'paid', 'clawedBack']),
                  periodKey: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  paidAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
            periodKey: z.string().optional(),
            totalAmount: z.number().optional(),
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
    path: '/v1/royalty-shares',
    alias: 'createRoyaltyShare',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRoyaltyShare_Body,
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
            shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
            jobId: z.string(),
            payeeParticipantId: z.string(),
            role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
            shareBps: z.number().int().gte(0).lte(10000),
            amount: z.number(),
            currency: z.string(),
            status: z.enum(['pending', 'paid', 'clawedBack']),
            periodKey: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            paidAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/royalty-shares/:shareId',
    alias: 'getRoyaltyShare',
    requestFormat: 'json',
    parameters: [
      {
        name: 'shareId',
        type: 'Path',
        schema: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            shareId: z.string().regex(/^ryl_[0-9A-HJKMNP-TV-Z]{26}$/),
            jobId: z.string(),
            payeeParticipantId: z.string(),
            role: z.enum(['data', 'kernel', 'compute', 'marketplace']),
            shareBps: z.number().int().gte(0).lte(10000),
            amount: z.number(),
            currency: z.string(),
            status: z.enum(['pending', 'paid', 'clawedBack']),
            periodKey: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            paidAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
