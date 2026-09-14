/**
 * ID Generator Service Implementation — starter + Cogbazaar prefixes.
 */

import type { DomainCode } from '@cogbazaar/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@cogbazaar/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@cogbazaar/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  lstId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.listings);
  }
  jobId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.jobs);
  }
  pcwId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pocwAttestations);
  }
  rylId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.royaltyShares);
  }
  grpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.grantPools);
  }
  polId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policyRules);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
