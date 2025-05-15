import { Injectable } from "@angular/core";
import { MessageControllerService } from "../controller/message-controller.service";

@Injectable({
    providedIn: "root",
})
export class MessageStoreService {
    constructor(private messageController: MessageControllerService) {}
}
