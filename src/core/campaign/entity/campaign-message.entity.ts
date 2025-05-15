import { Audit } from "../../common/model/audit.model";
import { MessageFields } from "../../message/entity/message.entity";
import { SenderData } from "../../message/model/sender-data.model";
import { CampaignFields } from "./campaign.entity";

export interface CampaignMessageFields extends Audit {
    sender_data: SenderData;
    message_id?: string;
    campaign_id?: string;
}

export interface CampaignMessage extends CampaignMessageFields {
    message?: MessageFields;
    campaign?: CampaignFields;
}
