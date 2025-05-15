export interface WhatsAppError {
    message: string; // Combination of the error code and title.
    type: string; // Type of error.
    code: number; // Error code (not HTTP code).
    error_data: WhatsAppErrorData; // Data related to the error.
    fbTraceId: string; // Unique identifier for the error.
}

export interface WhatsAppErrorData {
    details: string; // Error details, including possible reasons.
    messaging_product: string; // Additional messaging product data.
}
