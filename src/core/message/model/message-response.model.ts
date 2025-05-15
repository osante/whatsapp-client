export interface Response {
    contacts: ResponseContact[];
    messages: ResponseMessage[];
    messaging_product: string;
}

export interface ResponseContact {
    input: string;
    wa_id: string;
}

export interface ResponseMessage {
    message_status: string;
    id: string;
}
