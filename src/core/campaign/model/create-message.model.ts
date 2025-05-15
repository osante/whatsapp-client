import { SenderData } from "../../message/model/sender-data.model";

export interface CreateMessage {
    campaign_id: string;
    sender_data: SenderData;
}
