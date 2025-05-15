import { Audit } from "../../common/model/audit.model";
import { HttpMethod } from "../../common/model/http-methods.model";
import { Event } from "../model/event.model";

export interface Webhook extends Audit {
    url: string;
    authorization?: string;
    http_method: HttpMethod;
    timeout: number;
    event: Event;
}
