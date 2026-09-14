import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createListing_Body = z
  .object({
    listingType: z.enum(['dataset', 'kernel', 'compute']),
    sellerParticipantId: z.string(),
    title: z.string().optional(),
    priceAmount: z.number(),
    currency: z.string(),
    status: z.enum(['active', 'suspended', 'retired']).optional(),
    licenceClass: z.enum(['research', 'commercial', 'restricted']).optional(),
    dualUseFlag: z.boolean().optional(),
    computeToDataEligible: z.boolean().optional(),
    supportedPocwFormats: z.array(z.string()).optional(),
    takeRateBps: z.number().int().gte(0).lte(10000).optional(),
  })
  .passthrough();
const updateListing_Body = z
  .object({
    title: z.string(),
    priceAmount: z.number(),
    currency: z.string(),
    status: z.enum(['active', 'suspended', 'retired']),
    licenceClass: z.enum(['research', 'commercial', 'restricted']),
    dualUseFlag: z.boolean(),
    computeToDataEligible: z.boolean(),
    supportedPocwFormats: z.array(z.string()),
    takeRateBps: z.number().int().gte(0).lte(10000),
  })
  .partial()
  .passthrough();
const ListingType = z.enum(['dataset', 'kernel', 'compute']);
const LicenceClass = z.enum(['research', 'commercial', 'restricted']);
const ListingStatus = z.enum(['active', 'suspended', 'retired']);
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
const ListingId = z.string();
const Listing = z
  .object({
    listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
    listingType: z.enum(['dataset', 'kernel', 'compute']),
    sellerParticipantId: z.string(),
    title: z.string().optional(),
    priceAmount: z.number(),
    currency: z.string(),
    status: z.enum(['active', 'suspended', 'retired']),
    licenceClass: z.enum(['research', 'commercial', 'restricted']).optional(),
    dualUseFlag: z.boolean().optional(),
    computeToDataEligible: z.boolean().optional(),
    supportedPocwFormats: z.array(z.string()).optional(),
    takeRateBps: z.number().int().gte(0).lte(10000).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ListingListData = z
  .object({
    items: z.array(
      z
        .object({
          listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
          listingType: z.enum(['dataset', 'kernel', 'compute']),
          sellerParticipantId: z.string(),
          title: z.string().optional(),
          priceAmount: z.number(),
          currency: z.string(),
          status: z.enum(['active', 'suspended', 'retired']),
          licenceClass: z
            .enum(['research', 'commercial', 'restricted'])
            .optional(),
          dualUseFlag: z.boolean().optional(),
          computeToDataEligible: z.boolean().optional(),
          supportedPocwFormats: z.array(z.string()).optional(),
          takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
const ListingListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
              listingType: z.enum(['dataset', 'kernel', 'compute']),
              sellerParticipantId: z.string(),
              title: z.string().optional(),
              priceAmount: z.number(),
              currency: z.string(),
              status: z.enum(['active', 'suspended', 'retired']),
              licenceClass: z
                .enum(['research', 'commercial', 'restricted'])
                .optional(),
              dualUseFlag: z.boolean().optional(),
              computeToDataEligible: z.boolean().optional(),
              supportedPocwFormats: z.array(z.string()).optional(),
              takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
const ListingCreateRequest = z
  .object({
    listingType: z.enum(['dataset', 'kernel', 'compute']),
    sellerParticipantId: z.string(),
    title: z.string().optional(),
    priceAmount: z.number(),
    currency: z.string(),
    status: z.enum(['active', 'suspended', 'retired']).optional(),
    licenceClass: z.enum(['research', 'commercial', 'restricted']).optional(),
    dualUseFlag: z.boolean().optional(),
    computeToDataEligible: z.boolean().optional(),
    supportedPocwFormats: z.array(z.string()).optional(),
    takeRateBps: z.number().int().gte(0).lte(10000).optional(),
  })
  .passthrough();
const ListingResponse = z
  .object({
    data: z
      .object({
        listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
        listingType: z.enum(['dataset', 'kernel', 'compute']),
        sellerParticipantId: z.string(),
        title: z.string().optional(),
        priceAmount: z.number(),
        currency: z.string(),
        status: z.enum(['active', 'suspended', 'retired']),
        licenceClass: z
          .enum(['research', 'commercial', 'restricted'])
          .optional(),
        dualUseFlag: z.boolean().optional(),
        computeToDataEligible: z.boolean().optional(),
        supportedPocwFormats: z.array(z.string()).optional(),
        takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
const ListingUpdateRequest = z
  .object({
    title: z.string(),
    priceAmount: z.number(),
    currency: z.string(),
    status: z.enum(['active', 'suspended', 'retired']),
    licenceClass: z.enum(['research', 'commercial', 'restricted']),
    dualUseFlag: z.boolean(),
    computeToDataEligible: z.boolean(),
    supportedPocwFormats: z.array(z.string()),
    takeRateBps: z.number().int().gte(0).lte(10000),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createListing_Body,
  updateListing_Body,
  ListingType,
  LicenceClass,
  ListingStatus,
  Problem,
  ListingId,
  Listing,
  ListingListData,
  ResponseMeta,
  ListingListResponse,
  ListingCreateRequest,
  ListingResponse,
  ListingUpdateRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/listings',
    alias: 'listListings',
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
        name: 'listingType',
        type: 'Query',
        schema: z.enum(['dataset', 'kernel', 'compute']).optional(),
      },
      {
        name: 'licenceClass',
        type: 'Query',
        schema: z.enum(['research', 'commercial', 'restricted']).optional(),
      },
      {
        name: 'dualUseFlag',
        type: 'Query',
        schema: z.boolean().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'suspended', 'retired']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  listingType: z.enum(['dataset', 'kernel', 'compute']),
                  sellerParticipantId: z.string(),
                  title: z.string().optional(),
                  priceAmount: z.number(),
                  currency: z.string(),
                  status: z.enum(['active', 'suspended', 'retired']),
                  licenceClass: z
                    .enum(['research', 'commercial', 'restricted'])
                    .optional(),
                  dualUseFlag: z.boolean().optional(),
                  computeToDataEligible: z.boolean().optional(),
                  supportedPocwFormats: z.array(z.string()).optional(),
                  takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
    path: '/v1/listings',
    alias: 'createListing',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createListing_Body,
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
            listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
            listingType: z.enum(['dataset', 'kernel', 'compute']),
            sellerParticipantId: z.string(),
            title: z.string().optional(),
            priceAmount: z.number(),
            currency: z.string(),
            status: z.enum(['active', 'suspended', 'retired']),
            licenceClass: z
              .enum(['research', 'commercial', 'restricted'])
              .optional(),
            dualUseFlag: z.boolean().optional(),
            computeToDataEligible: z.boolean().optional(),
            supportedPocwFormats: z.array(z.string()).optional(),
            takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
    method: 'get',
    path: '/v1/listings/:listingId',
    alias: 'getListing',
    requestFormat: 'json',
    parameters: [
      {
        name: 'listingId',
        type: 'Path',
        schema: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
            listingType: z.enum(['dataset', 'kernel', 'compute']),
            sellerParticipantId: z.string(),
            title: z.string().optional(),
            priceAmount: z.number(),
            currency: z.string(),
            status: z.enum(['active', 'suspended', 'retired']),
            licenceClass: z
              .enum(['research', 'commercial', 'restricted'])
              .optional(),
            dualUseFlag: z.boolean().optional(),
            computeToDataEligible: z.boolean().optional(),
            supportedPocwFormats: z.array(z.string()).optional(),
            takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
    path: '/v1/listings/:listingId',
    alias: 'updateListing',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateListing_Body,
      },
      {
        name: 'listingId',
        type: 'Path',
        schema: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
            listingType: z.enum(['dataset', 'kernel', 'compute']),
            sellerParticipantId: z.string(),
            title: z.string().optional(),
            priceAmount: z.number(),
            currency: z.string(),
            status: z.enum(['active', 'suspended', 'retired']),
            licenceClass: z
              .enum(['research', 'commercial', 'restricted'])
              .optional(),
            dualUseFlag: z.boolean().optional(),
            computeToDataEligible: z.boolean().optional(),
            supportedPocwFormats: z.array(z.string()).optional(),
            takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
    path: '/v1/listings/:listingId/suspend',
    alias: 'suspendListing',
    requestFormat: 'json',
    parameters: [
      {
        name: 'listingId',
        type: 'Path',
        schema: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            listingId: z.string().regex(/^lst_[0-9A-HJKMNP-TV-Z]{26}$/),
            listingType: z.enum(['dataset', 'kernel', 'compute']),
            sellerParticipantId: z.string(),
            title: z.string().optional(),
            priceAmount: z.number(),
            currency: z.string(),
            status: z.enum(['active', 'suspended', 'retired']),
            licenceClass: z
              .enum(['research', 'commercial', 'restricted'])
              .optional(),
            dualUseFlag: z.boolean().optional(),
            computeToDataEligible: z.boolean().optional(),
            supportedPocwFormats: z.array(z.string()).optional(),
            takeRateBps: z.number().int().gte(0).lte(10000).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
