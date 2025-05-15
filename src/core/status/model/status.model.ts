import { Pricing } from "../../common/model/pricing.model";
import { Conversation } from "./conversation.model";
import { SendingStatus } from "./sending-status.model";

export interface Status {
    biz_opaque_callback_data?: string; // Arbitrary string for tracking messages, groups, etc.
    conversation?: Conversation; // Information about the conversation.
    errors?: Error[]; // Array of error objects.
    id: string; // ID for the message sent to a customer.
    pricing?: Pricing; // Pricing information.
    recipient_id: string; // The customer's WhatsApp ID.
    status?: SendingStatus; // Message status.
    timestamp: string; // Date for the status message.
}
