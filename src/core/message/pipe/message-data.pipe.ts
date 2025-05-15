import { Pipe, PipeTransform } from "@angular/core";
import { SenderData } from "../model/sender-data.model";
import { MessageFields } from "../entity/message.entity";
import { ReceiverData } from "../model/receiver-data.model";
import { NIL as NilUUID } from "uuid";

@Pipe({
    name: "messageData",
    standalone: true,
})
export class MessageDataPipe implements PipeTransform {
    transform(conversation: MessageFields): SenderData | ReceiverData {
        if (conversation.from_id && conversation.from_id != NilUUID)
            return conversation.receiver_data as ReceiverData;

        return conversation.sender_data as SenderData;
    }
}
