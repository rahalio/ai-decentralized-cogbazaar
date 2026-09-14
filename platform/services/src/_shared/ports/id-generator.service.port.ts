/**
 * IdGeneratorService Port — starter + Cogbazaar product prefixes.
 */

import type { DomainCode } from '@cogbazaar/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  lstId(): string;
  jobId(): string;
  pcwId(): string;
  rylId(): string;
  grpId(): string;
  polId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
