import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Conversation } from "../../../core/message/model/conversation.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-message-info",
    imports: [CommonModule, MatIconModule],
    templateUrl: "./message-info.component.html",
    styleUrl: "./message-info.component.scss",
    standalone: true,
})
export class MessageInfoComponent {
    showModal = false;

    @Input("message") message!: Conversation;
    @Input("sent") sent: boolean = true;

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}
