import { PricingCategory } from "./pricing-category.model";

export interface Pricing {
    category?: PricingCategory; // Pricing category.
    pricing_model?: string; // Pricing model.
    billable?: boolean; // Billable status.
}
