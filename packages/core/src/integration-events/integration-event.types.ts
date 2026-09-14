/**
 * Integration event type definitions (hand-maintained).
 * Generator only writes `generated/registry.ts`.
 */

export type IntegrationEventDeliveryMode = "sync" | "async";

export type IntegrationEventTypeDefinition = {
  type: string;
  domain: string;
  aggregateType: string;
  description?: string;
  defaultDeliveryMode?: IntegrationEventDeliveryMode;
};

export type IntegrationEventPayload = Record<string, unknown>;
