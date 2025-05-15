export interface ReceivedContext {
    forwarded: boolean;
    frequently_forwarded: boolean;
    from: string;
    id: string;
    referred_product?: ReferredProduct;
}

export interface ReferredProduct {
    catalog_id: string;
    product_retailer_id: string;
}
