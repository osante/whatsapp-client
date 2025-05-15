import { ProductDetails } from "./product-details.model";

export interface CreateWhatsAppContact {
    contact_id: string;
    product_details: ProductDetails;
}
