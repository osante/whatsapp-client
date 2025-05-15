import { HttpMethod } from "../../common/model/http-methods.model";
import { Event } from "./event.model";

export interface Update {
    id: string;
    url?: string;
    authorization?: string;
    event?: Event;
    http_method?: HttpMethod;
    timeout?: number;
}
