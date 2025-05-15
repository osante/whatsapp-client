import { HttpMethod } from "../../common/model/http-methods.model";
import { Event } from "./event.model";

export interface Query {
    id?: string;
    url?: string;
    event?: Event;
    http_method?: HttpMethod;
    timeout?: number;
}

export interface QueryLogs {
    id?: string;
    http_response_code?: number;
    webhook_id?: string;
}
