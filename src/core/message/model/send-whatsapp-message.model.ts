import { SenderData } from "./sender-data.model";

export interface SendWhatsAppMessage {
    sender_data: SenderData;
    to_id: string;
}
