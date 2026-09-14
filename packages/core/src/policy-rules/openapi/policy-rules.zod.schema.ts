import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPolicyRule_Body = z
  .object({
    ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
    status: z.enum(['active', 'disabled']).optional(),
    expression: z.string(),
    targetListingId: z.string().optional(),
    agentAccountId: z.string().optional(),
    spendCapAmount: z.number().optional(),
    spendCapCurrency: z.string().optional(),
    dualUseQueue: z.boolean().optional(),
  })
  .passthrough();
const PolicyRuleType = z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']);
const PolicyRuleStatus = z.enum(['active', 'disabled']);
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
const RuleId = z.string();
const PolicyRule = z
  .object({
    ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
    status: z.enum(['active', 'disabled']),
    expression: z.string(),
    targetListingId: z.string().optional(),
    agentAccountId: z.string().optional(),
    spendCapAmount: z.number().optional(),
    spendCapCurrency: z.string().optional(),
    spendUsedAmount: z.number().optional(),
    dualUseQueue: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PolicyRuleListData = z
  .object({
    items: z.array(
      z
        .object({
          ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
          ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
          status: z.enum(['active', 'disabled']),
          expression: z.string(),
          targetListingId: z.string().optional(),
          agentAccountId: z.string().optional(),
          spendCapAmount: z.number().optional(),
          spendCapCurrency: z.string().optional(),
          spendUsedAmount: z.number().optional(),
          dualUseQueue: z.boolean().optional(),
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
const PolicyRuleListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              ruleType: z.enum([
                'dualUseBlock',
                'agentSpendCap',
                'licenceGate',
              ]),
              status: z.enum(['active', 'disabled']),
              expression: z.string(),
              targetListingId: z.string().optional(),
              agentAccountId: z.string().optional(),
              spendCapAmount: z.number().optional(),
              spendCapCurrency: z.string().optional(),
              spendUsedAmount: z.number().optional(),
              dualUseQueue: z.boolean().optional(),
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
const PolicyRuleCreateRequest = z
  .object({
    ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
    status: z.enum(['active', 'disabled']).optional(),
    expression: z.string(),
    targetListingId: z.string().optional(),
    agentAccountId: z.string().optional(),
    spendCapAmount: z.number().optional(),
    spendCapCurrency: z.string().optional(),
    dualUseQueue: z.boolean().optional(),
  })
  .passthrough();
const PolicyRuleResponse = z
  .object({
    data: z
      .object({
        ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
        status: z.enum(['active', 'disabled']),
        expression: z.string(),
        targetListingId: z.string().optional(),
        agentAccountId: z.string().optional(),
        spendCapAmount: z.number().optional(),
        spendCapCurrency: z.string().optional(),
        spendUsedAmount: z.number().optional(),
        dualUseQueue: z.boolean().optional(),
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

export const schemas: any = {
  createPolicyRule_Body,
  PolicyRuleType,
  PolicyRuleStatus,
  Problem,
  RuleId,
  PolicyRule,
  PolicyRuleListData,
  ResponseMeta,
  PolicyRuleListResponse,
  PolicyRuleCreateRequest,
  PolicyRuleResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/policy-rules',
    alias: 'listPolicyRules',
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
        name: 'ruleType',
        type: 'Query',
        schema: z
          .enum(['dualUseBlock', 'agentSpendCap', 'licenceGate'])
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'disabled']).optional(),
      },
      {
        name: 'dualUseQueue',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  ruleType: z.enum([
                    'dualUseBlock',
                    'agentSpendCap',
                    'licenceGate',
                  ]),
                  status: z.enum(['active', 'disabled']),
                  expression: z.string(),
                  targetListingId: z.string().optional(),
                  agentAccountId: z.string().optional(),
                  spendCapAmount: z.number().optional(),
                  spendCapCurrency: z.string().optional(),
                  spendUsedAmount: z.number().optional(),
                  dualUseQueue: z.boolean().optional(),
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
    path: '/v1/policy-rules',
    alias: 'createPolicyRule',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPolicyRule_Body,
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
            ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
            status: z.enum(['active', 'disabled']),
            expression: z.string(),
            targetListingId: z.string().optional(),
            agentAccountId: z.string().optional(),
            spendCapAmount: z.number().optional(),
            spendCapCurrency: z.string().optional(),
            spendUsedAmount: z.number().optional(),
            dualUseQueue: z.boolean().optional(),
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
    path: '/v1/policy-rules/:ruleId',
    alias: 'getPolicyRule',
    requestFormat: 'json',
    parameters: [
      {
        name: 'ruleId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            ruleId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            ruleType: z.enum(['dualUseBlock', 'agentSpendCap', 'licenceGate']),
            status: z.enum(['active', 'disabled']),
            expression: z.string(),
            targetListingId: z.string().optional(),
            agentAccountId: z.string().optional(),
            spendCapAmount: z.number().optional(),
            spendCapCurrency: z.string().optional(),
            spendUsedAmount: z.number().optional(),
            dualUseQueue: z.boolean().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
