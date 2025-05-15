import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ConversationMessagingProductContact } from "../../../core/message/model/conversation.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MessagingProductContactFromMessagePipe } from "../../../core/message/pipe/messaging-product-contact-from-message.pipe";
import { ConversationPreviewComponent } from "./conversation-preview/conversation-preview.component";
import { MatIconModule } from "@angular/material/icon";
import { QueryParamsService } from "../../../core/navigation/service/query-params.service";
import { ConversationStoreService } from "../../../core/message/store/conversation-store.service";

@Component({
    selector: "app-contacts-modal",
    imports: [
        CommonModule,
        FormsModule,
        ConversationPreviewComponent,
        MessagingProductContactFromMessagePipe,
        MatIconModule,
    ],
    templateUrl: "./contacts-modal.component.html",
    styleUrl: "./contacts-modal.component.scss",
    standalone: true,
})
export class ContactsModalComponent implements OnInit {
    private scrolling: boolean = false;

    @Input("headerText") headerText!: string;
    @Input("bottomText") bottomText!: string;
    @Output("send") send = new EventEmitter<
        ConversationMessagingProductContact[]
    >();
    @Output("close") close = new EventEmitter();

    selectedConversations: ConversationMessagingProductContact[] = [];
    messagingProductContactIdFilter?: string;

    constructor(
        private queryParamsService: QueryParamsService,
        private route: ActivatedRoute,
        private router: Router,
        public conversationStore: ConversationStoreService,
    ) {}

    adjustHeight(event: Event): void {
        const element = event.target as HTMLElement;
        if (!element) return;
        element.style.height = "auto"; // Reset height to auto to get the correct scrollHeight
        element.style.height = `${element.scrollHeight}px`; // Set height to scrollHeight
    }

    async ngOnInit() {
        this.conversationStore.initConditionally(this.route);
        this.watchQueryParams();
    }

    async getConversations(): Promise<void> {
        this.scrolling = true;

        await this.conversationStore.get();

        this.scrolling = false;
    }

    onScroll(event: Event) {
        const element = event.target as HTMLElement;
        if (
            // Check if the user has scrolled to the bottom of the element
            !(
                element.scrollHeight - element.scrollTop <=
                    element.clientHeight + 100 &&
                // Check if some request is being performed
                !this.scrolling
            )
        )
            return;

        if (
            // Check if user is not searching
            !this.conversationStore.searchValue &&
            !this.messagingProductContactIdFilter &&
            !this.conversationStore.reachedMaxConversationLimit
        )
            this.getConversations();
        else if (
            (this.conversationStore.searchValue ||
                this.messagingProductContactIdFilter) &&
            !this.conversationStore.reachedMaxSearchConversationLimit &&
            !this.conversationStore.isExecuting &&
            !this.conversationStore.pendingExecution
        )
            this.getSearchConversations();
    }

    async getSearchConversations(): Promise<void> {
        this.scrolling = true;

        await this.conversationStore.getSearchConversations();

        this.scrolling = false;
    }

    async getInitialSearchConversations(): Promise<void> {
        this.scrolling = true;

        await this.conversationStore.getInitialSearch();

        this.scrolling = false;
    }

    async addMessagingProductContactIdField(messagingProductContactId: string) {
        await this.conversationStore.addFilter(
            {
                text: `Messaging product contact id ${messagingProductContactId}`,
            },
            messagingProductContactId,
        );
    }

    watchQueryParams() {
        this.route.queryParams.subscribe(async (params) => {
            const messagingProductContactId =
                params["messaging_product_contact.id"];
            if (!messagingProductContactId) return;
            this.conversationStore.read(messagingProductContactId);
        });
    }

    addChat() {
        this.router.navigate([], {
            queryParams: {
                mode: "new_contact",
                ...this.queryParamsService.globalQueryParams,
            },
            queryParamsHandling: "replace",
            preserveFragment: true,
        });
    }

    selectConversation(conversation: ConversationMessagingProductContact) {
        this.selectedConversations.push(conversation);
    }

    unselectConversation(conversation: ConversationMessagingProductContact) {
        this.selectedConversations = this.selectedConversations.filter(
            (selectedConversation) =>
                selectedConversation.id !== conversation.id,
        );
    }

    isConversationSelected(conversation: ConversationMessagingProductContact) {
        return this.selectedConversations.some(
            (selectedConversation) =>
                selectedConversation.id === conversation.id,
        );
    }

    sendToContacts() {
        this.send.emit(this.selectedConversations);
        this.selectedConversations = [];
        this.close.emit();
    }

    closeModal() {
        this.selectedConversations = [];
        this.close.emit();
    }
}
