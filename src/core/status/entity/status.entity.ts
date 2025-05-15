import { Audit } from "../../common/model/audit.model";
import { MessageFields } from "../../message/entity/message.entity";
import { ProductData } from "../model/product-data.model";

export interface StatusFields extends Audit {
    message_id: string;
    product_data: ProductData;
}

export interface Status extends StatusFields {
    message: MessageFields;
}
