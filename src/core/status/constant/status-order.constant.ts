import { SendingStatus } from "../model/sending-status.model";

export const statusOrder = new Map<SendingStatus, number>([
    [SendingStatus.failed, 0],
    [SendingStatus.read, 1],
    [SendingStatus.delivered, 2],
    [SendingStatus.sent, 3],
]);
