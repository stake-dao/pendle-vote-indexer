/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { formatUnits, parseUnits } from "ethers";
import {
  PendleVotingController,
  PendleVotingController_Vote,
} from "generated";

PendleVotingController.Vote.handler(async ({ event, context }) => {

  // Fetch previous vote
  const key: string = `${event.params.user}-${event.params.pool}`;
  let veCRVotedPreviousVote = 0;
  let previousVote = await context.PendleVotingController_Vote.get(key);
  if (previousVote) {
    veCRVotedPreviousVote = previousVote.veCRVoted;
  }

  // Fetch ve position
  const vePosition = await context.VePendle_NewLockPosition.get(event.params.user);
  if(!vePosition) {
    return;
  }

  // Convert ve positon to ve balance
  const slope = parseUnits(vePosition.amount.toString(), 18) / BigInt(62899200);
  const bias = slope * BigInt(vePosition.expiry);

  // Compute current ve amount
  let veCRV = 0;
  if (slope * BigInt(event.block.timestamp) <= bias) {
    veCRV = parseFloat(formatUnits(bias - slope * BigInt(event.block.timestamp), 18));
  }

  let veCRVoted = 0;
  if (event.params.vote[1] !== BigInt(0)) {
    const t_start = BigInt(vePosition.expiry) - event.params.vote[0] / event.params.vote[1];
    const ve = parseFloat(formatUnits(event.params.vote[0] - event.params.vote[1] * (BigInt(event.block.timestamp) - t_start), 18));
    veCRVoted = Math.max(0, ve)
  }

  // Format weight
  const weightFormatted = parseFloat(formatUnits(event.params.weight, 16));

  const entity: PendleVotingController_Vote = {
    id: key,
    user: event.params.user,
    gauge: event.params.pool,
    weight: weightFormatted,
    time: event.block.timestamp,
    tx: event.transaction.hash,
    diffPreviousVote: veCRVotedPreviousVote === 0 ? 0 : veCRVoted - veCRVotedPreviousVote,
    veCRV,
    veCRVoted,
  };

  context.PendleVotingController_Vote.set(entity);
});
