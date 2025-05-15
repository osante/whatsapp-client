import { Origin } from "../../common/model/pricing-category.model";

export interface Conversation {
    id: string; // ID of the conversation the notification belongs to.
    origin: Origin; // Describes conversation category.
    expiration_timestamp: string; // Expiration timestamp for the conversation.
}
