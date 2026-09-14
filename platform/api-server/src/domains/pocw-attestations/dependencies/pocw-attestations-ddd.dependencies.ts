/**
 * PocwAttestations DDD Dependencies - Composition root (hand-fitted for sandbox).
 */

import {
  AcceptRepositoryAdapter,
  ExportPackRepositoryAdapter,
  PocwAttestationRepositoryAdapter,
  RejectRepositoryAdapter,
} from "@cogbazaar/adapters/pocw-attestations";
import { getIdGeneratorService } from "@cogbazaar/adapters";
import type { AdapterDynamoDBClient } from "@cogbazaar/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteAcceptPoCWAttestation,
  ExecuteExportPoCWAttestationPack,
  ExecuteGetPoCWAttestation,
  ExecuteListPoCWAttestations,
  ExecuteRejectPoCWAttestation,
  ExecuteSubmitPoCWAttestation,
} from "@cogbazaar/services/pocw-attestations/usecases";
import type {
  AcceptRepository,
  ExportPackRepository,
  PocwAttestationRepository,
  RejectRepository,
} from "@cogbazaar/services/pocw-attestations/ports";

export interface PocwAttestationsDomainModule {
  repos: {
    accepts: AcceptRepository;
    exportPacks: ExportPackRepository;
    pocwAttestations: PocwAttestationRepository;
    rejects: RejectRepository;
  };
  useCases: {
    accepts: {
      get: ExecuteAcceptPoCWAttestation;
      create: ExecuteAcceptPoCWAttestation;
    };
    exportPacks: {
      create: ExecuteExportPoCWAttestationPack;
      list: ExecuteExportPoCWAttestationPack;
    };
    pocwAttestations: {
      create: ExecuteSubmitPoCWAttestation;
      get: ExecuteGetPoCWAttestation;
      list: ExecuteListPoCWAttestations;
    };
    rejects: {
      create: ExecuteRejectPoCWAttestation;
    };
  };
}

export function buildPocwAttestationsDomainModule(
  dynamoClient: AdapterDynamoDBClient
): PocwAttestationsDomainModule {
  const repos = {
    accepts: new AcceptRepositoryAdapter(dynamoClient),
    exportPacks: new ExportPackRepositoryAdapter(dynamoClient),
    pocwAttestations: new PocwAttestationRepositoryAdapter(dynamoClient),
    rejects: new RejectRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const acceptUc = new ExecuteAcceptPoCWAttestation(
    executionContext,
    idGenerator,
    repos.accepts
  );
  const exportUc = new ExecuteExportPoCWAttestationPack(
    executionContext,
    idGenerator,
    repos.exportPacks
  );

  return {
    repos,
    useCases: {
      accepts: { get: acceptUc, create: acceptUc },
      exportPacks: { create: exportUc, list: exportUc },
      pocwAttestations: {
        create: new ExecuteSubmitPoCWAttestation(
          executionContext,
          idGenerator,
          repos.pocwAttestations
        ),
        get: new ExecuteGetPoCWAttestation(
          executionContext,
          idGenerator,
          repos.pocwAttestations
        ),
        list: new ExecuteListPoCWAttestations(
          executionContext,
          idGenerator,
          repos.pocwAttestations
        ),
      },
      rejects: {
        create: new ExecuteRejectPoCWAttestation(
          executionContext,
          idGenerator,
          repos.rejects
        ),
      },
    },
  };
}
