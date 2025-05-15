export enum PricingCategory {
    authentication = "authentication", // Business-initiated with AUTHENTICATION template.
    marketing = "marketing", // Business-initiated with MARKETING template.
    utility = "utility", // Business-initiated with UTILITY template.
    service = "service", // Opened by a business replying to a customer.
    referral_conversation = "referral_conversation", // Free entry point conversation.
}

export interface Origin {
    type: PricingCategory; // Indicates conversation category.
}
