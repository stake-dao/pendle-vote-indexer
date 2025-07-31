/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  PendleVotingController,
  PendleVotingController_AddPool,
  PendleVotingController_AdminChanged,
  PendleVotingController_BeaconUpgraded,
  PendleVotingController_BroadcastResults,
  PendleVotingController_Initialized,
  PendleVotingController_OwnershipTransferred,
  PendleVotingController_PoolVoteChange,
  PendleVotingController_RemovePool,
  PendleVotingController_SetPendlePerSec,
  PendleVotingController_Upgraded,
  PendleVotingController_Vote,
} from "generated";

PendleVotingController.AddPool.handler(async ({ event, context }) => {
  const entity: PendleVotingController_AddPool = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    chainId: event.params.chainId,
    pool: event.params.pool,
  };

  context.PendleVotingController_AddPool.set(entity);
});

PendleVotingController.AdminChanged.handler(async ({ event, context }) => {
  const entity: PendleVotingController_AdminChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousAdmin: event.params.previousAdmin,
    newAdmin: event.params.newAdmin,
  };

  context.PendleVotingController_AdminChanged.set(entity);
});

PendleVotingController.BeaconUpgraded.handler(async ({ event, context }) => {
  const entity: PendleVotingController_BeaconUpgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    beacon: event.params.beacon,
  };

  context.PendleVotingController_BeaconUpgraded.set(entity);
});

PendleVotingController.BroadcastResults.handler(async ({ event, context }) => {
  const entity: PendleVotingController_BroadcastResults = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    chainId: event.params.chainId,
    wTime: event.params.wTime,
    totalPendlePerSec: event.params.totalPendlePerSec,
  };

  context.PendleVotingController_BroadcastResults.set(entity);
});

PendleVotingController.Initialized.handler(async ({ event, context }) => {
  const entity: PendleVotingController_Initialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    version: event.params.version,
  };

  context.PendleVotingController_Initialized.set(entity);
});

PendleVotingController.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: PendleVotingController_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.PendleVotingController_OwnershipTransferred.set(entity);
});

PendleVotingController.PoolVoteChange.handler(async ({ event, context }) => {
  const entity: PendleVotingController_PoolVoteChange = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pool: event.params.pool,
    vote_0: event.params.vote
        [0]
    ,
    vote_1: event.params.vote
        [1]
    ,
  };

  context.PendleVotingController_PoolVoteChange.set(entity);
});

PendleVotingController.RemovePool.handler(async ({ event, context }) => {
  const entity: PendleVotingController_RemovePool = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    chainId: event.params.chainId,
    pool: event.params.pool,
  };

  context.PendleVotingController_RemovePool.set(entity);
});

PendleVotingController.SetPendlePerSec.handler(async ({ event, context }) => {
  const entity: PendleVotingController_SetPendlePerSec = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newPendlePerSec: event.params.newPendlePerSec,
  };

  context.PendleVotingController_SetPendlePerSec.set(entity);
});

PendleVotingController.Upgraded.handler(async ({ event, context }) => {
  const entity: PendleVotingController_Upgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    implementation: event.params.implementation,
  };

  context.PendleVotingController_Upgraded.set(entity);
});

PendleVotingController.Vote.handler(async ({ event, context }) => {
  const entity: PendleVotingController_Vote = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    pool: event.params.pool,
    weight: event.params.weight,
    vote_0: event.params.vote
        [0]
    ,
    vote_1: event.params.vote
        [1]
    ,
  };

  context.PendleVotingController_Vote.set(entity);
});
