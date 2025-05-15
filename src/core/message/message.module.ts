import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagingProductContactFromMessagePipe } from "./pipe/messaging-product-contact-from-message.pipe";
import { MessageDataPipe } from "./pipe/message-data.pipe";
import { MessagePreviewPipe } from "./pipe/message-preview.pipe";
import { ConversationControllerService } from "./controller/conversation-controller.service";
import { ConversationStoreService } from "./store/conversation-store.service";
import { UserConversationsStoreService } from "./store/user-conversations-store.service";
import { MessageIdPipe } from "./pipe/message-id.pipe";

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        ConversationControllerService,
        ConversationStoreService,
        UserConversationsStoreService,
        MessagingProductContactFromMessagePipe,
        MessageDataPipe,
        MessageIdPipe,
        MessagePreviewPipe,
        MessagingProductContactFromMessagePipe,
    ],
})
export class MessageModule {}
