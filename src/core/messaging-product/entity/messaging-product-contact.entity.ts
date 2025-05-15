import { Audit } from "../../common/model/audit.model";
import { Contact } from "../../contact/entity/contact.entity";
import { ProductDetails } from "../model/product-details.model";
import { MessagingProduct } from "./messaging-product.entity";

export interface MessagingProductContactFields extends Audit {
    product_details: ProductDetails;
    contact_id: string;
    messaging_product_id: string;
    blocked: boolean;
    last_read_at: Date;
}

export interface MessagingProductContact extends MessagingProductContactFields {
    contact: Contact;
    messaging_product: MessagingProduct;
}
