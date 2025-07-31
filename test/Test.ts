import assert from "assert";
import { 
  TestHelpers,
  PendleVotingController_AddPool
} from "generated";
const { MockDb, PendleVotingController } = TestHelpers;

describe("PendleVotingController contract AddPool event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for PendleVotingController contract AddPool event
  const event = PendleVotingController.AddPool.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("PendleVotingController_AddPool is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await PendleVotingController.AddPool.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualPendleVotingControllerAddPool = mockDbUpdated.entities.PendleVotingController_AddPool.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedPendleVotingControllerAddPool: PendleVotingController_AddPool = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      chainId: event.params.chainId,
      pool: event.params.pool,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualPendleVotingControllerAddPool, expectedPendleVotingControllerAddPool, "Actual PendleVotingControllerAddPool should be the same as the expectedPendleVotingControllerAddPool");
  });
});
