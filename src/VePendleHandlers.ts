import { formatUnits } from "ethers";
import {
    VePendle,
    VePendle_NewLockPosition,
} from "generated";

VePendle.NewLockPosition.handler(async ({ event, context }) => {
    const entity: VePendle_NewLockPosition = {
        id: `${event.params.user}`,
        user: event.params.user,
        amount: parseFloat(formatUnits(event.params.amount, 18)),
        expiry: Number(event.params.expiry),
    };

    context.VePendle_NewLockPosition.set(entity);
});