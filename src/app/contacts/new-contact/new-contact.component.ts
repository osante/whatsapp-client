import { Component, EventEmitter, Output } from "@angular/core";
import { ContactInfoComponent } from "../contact-info/contact-info.component";
import { ConversationMessagingProductContact } from "../../../core/message/model/conversation.model";

@Component({
    selector: "app-new-contact",
    imports: [ContactInfoComponent],
    templateUrl: "./new-contact.component.html",
    styleUrl: "./new-contact.component.scss",
    standalone: true,
})
export class NewContactComponent {
    @Output() select = new EventEmitter<ConversationMessagingProductContact>();
}
