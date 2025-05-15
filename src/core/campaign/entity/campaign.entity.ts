import { Audit } from "../../common/model/audit.model";
import { MessagingProduct } from "../../messaging-product/entity/messaging-product.entity";

export interface CampaignFields extends Audit {
    name: string;
    messaging_product_id: string;
}

export interface Campaign extends CampaignFields {
    messaging_product: MessagingProduct;
}
