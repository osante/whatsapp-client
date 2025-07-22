import { Component, Input, ViewChild } from "@angular/core";
import { Template } from "../../../core/template/model/template.model";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
    ParameterType,
    UseTemplateComponent,
} from "../../../core/message/model/use-template-component.model";
import {
    ComponentExample,
    TemplateComponent,
} from "../../../core/template/model/template-component.model";
import { TemplateComponentType } from "../../../core/template/model/template-component-type.model";
import { TemplateComponentFormat } from "../../../core/template/model/template-component-format.model";
import {
    Conversation,
    ConversationMessagingProductContact,
} from "../../../core/message/model/conversation.model";
import { NIL as NilUUID } from "uuid";
import { MessageType } from "../../../core/message/model/message-type.model";
import { MediaControllerService } from "../../../core/media/controller/media-controller.service";
import { MessageControllerService } from "../../../core/message/controller/message-controller.service";
import { MessageTemplateContentComponent } from "../../messages/message-template-content/message-template-content.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import { TimeoutErrorModalComponent } from "../../common/timeout-error-modal/timeout-error-modal.component";
import { MatIconModule } from "@angular/material/icon";
import { MediaMessageFileUploadComponent } from "../../messages/media-message-file-upload/media-message-file-upload.component";
import { ContactsModalComponent } from "../../contacts/contact-modal/contacts-modal.component";
import { NGXLogger } from "ngx-logger";
import { UserConversationsStoreService } from "../../../core/message/store/user-conversations-store.service";

@Component({
    selector: "app-template-message-builder",
    imports: [
        FormsModule,
        CommonModule,
        ContactsModalComponent,
        MessageTemplateContentComponent,
        MatTooltipModule,
        TimeoutErrorModalComponent,
        MatIconModule,
        MediaMessageFileUploadComponent,
    ],
    templateUrl: "./template-message-builder.component.html",
    styleUrl: "./template-message-builder.component.scss",
    standalone: true,
})
export class TemplateMessageBuilderComponent {
    TemplateComponentType = TemplateComponentType;

    @Input()
    get template(): Template {
        return this._template;
    }
    set template(template: Template) {
        if (!template) {
            return;
        }
        this._template = template;
        this.generateComponents();
        this.setMessage();
    }
    private _template!: Template;
    @ViewChild("templateMessage")
    templateMessage!: MessageTemplateContentComponent;
    @ViewChild("errorModal") errorModal!: TimeoutErrorModalComponent;

    isModalOpen: boolean = false;
    mediaByUrl: boolean = false;
    selectedFile?: File;
    headerMediaByUrl: boolean = false;
    headerUseMedia: {
        caption: string;
        id: string;
        link: string;
    } = {
        caption: "",
        id: "",
        link: "",
    };
    components: UseTemplateComponent[] = [];
    message?: Conversation;
    bodyText: { text: string; type: ParameterType } = {
        text: "",
        type: ParameterType.text,
    };

    constructor(
        private mediaController: MediaControllerService,
        private messageController: MessageControllerService,
        private logger: NGXLogger,
        private userConversationStore: UserConversationsStoreService,
    ) {}

    adjustHeight(area: HTMLTextAreaElement): void {
        if (!area) return;
        area.style.height = "auto"; // Reset height to auto to get the correct scrollHeight
        area.style.height = `${area.scrollHeight}px`; // Set height to scrollHeight
    }

    async onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (!target.files || target.files.length <= 0) return (this.selectedFile = undefined);

        this.selectedFile = target.files[0];
        const mimeType = this.selectedFile.type;
        try {
            const uploadResponse = await this.mediaController.uploadMedia(
                this.selectedFile,
                mimeType,
            );
            this.headerUseMedia.id = uploadResponse.id;
        } catch (error) {
            this.handleErr("Failed to upload media", error);
            return Promise.reject(error);
        }
    }

    generateComponents() {
        this.components = this.template.components
            .map(component => this.generateComponent(component))
            .filter(generatedComponent => generatedComponent.parameters.length !== 0);
    }

    generateComponent(component: TemplateComponent): UseTemplateComponent {
        let useComponent: UseTemplateComponent = {
            type: component.type,
            parameters: [],
        };

        if (!component.example) return useComponent;
        const example = component.example;

        switch (component.type.toLowerCase()) {
            case TemplateComponentType.header.toLowerCase():
                this.handleHeaderComponent(component, useComponent, example);
                break;
            case TemplateComponentType.body.toLowerCase():
                this.handleBodyComponent(component, useComponent, example);
                break;
            case TemplateComponentType.footer.toLowerCase():
                this.handleFooterComponent(component, useComponent, example);
                break;
            case TemplateComponentType.buttons.toLowerCase():
                this.handleButtonsComponent(component, useComponent, example);
                break;
        }

        return useComponent;
    }

    handleHeaderComponent(
        component: TemplateComponent,
        useComponent: UseTemplateComponent,
        example: ComponentExample,
    ) {
        if (
            component.format?.toLowerCase() != TemplateComponentFormat.Text.toLowerCase() &&
            example.header_handle?.length
        ) {
            useComponent.parameters.push({
                type: component.format?.toLowerCase() as ParameterType,
                [component.format?.toLowerCase() as ParameterType]: this.headerUseMedia,
            });
        } else if (example.header_text)
            useComponent.parameters.push({
                type: ParameterType.text,
                text: "",
            });
    }

    handleBodyComponent(
        component: TemplateComponent,
        useComponent: UseTemplateComponent,
        example: ComponentExample,
    ) {
        if (!example.body_text) return;
        example.body_text.forEach(text => {
            useComponent.parameters.push({
                type: ParameterType.text,
                text: "",
            });
        });
    }

    handleFooterComponent(
        component: TemplateComponent,
        useComponent: UseTemplateComponent,
        example: ComponentExample,
    ) {
        return;
    }

    handleButtonsComponent(
        component: TemplateComponent,
        useComponent: UseTemplateComponent,
        example: ComponentExample,
    ) {
        return;
    }

    setMessage() {
        if (!this.template || !this.template.name || !this.template.language) return;
        const message = {
            from_id: NilUUID,
            messaging_product_id: NilUUID,
            to_id: NilUUID,
            id: NilUUID,
            sender_data: {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: "0000000000",
                type: MessageType.template,
                template: {
                    name: this.template.name,
                    language: { code: this.template.language },
                    components: this.components,
                },
            },
            created_at: new Date(),
            updated_at: new Date(),
        };
        this.message = message;
    }

    addParameterToText(event: string, i: number, j: number) {
        this.components[i].parameters[j].text = event;
        this.templateMessage.interpolateTemplate();
    }

    onMediaModeChange(event: string) {
        this.mediaByUrl = event === "true";
    }

    copySenderData() {
        navigator.clipboard.writeText(JSON.stringify(this.message?.sender_data, null, 4));
    }

    // Helper function to flatten nested objects, handling arrays as JSON strings
    flattenObject(obj: any, parentKey: string = "", result: any = {}): any {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const newKey = parentKey ? `${parentKey}.${key}` : key;
                const value = obj[key];

                if (value && typeof value === "object" && !Array.isArray(value)) {
                    // Recursively flatten nested objects
                    this.flattenObject(value, newKey, result);
                } else if (Array.isArray(value)) {
                    // Serialize arrays as JSON strings
                    result[newKey] = JSON.stringify(value);
                } else {
                    // Assign primitive values directly
                    result[newKey] = value;
                }
            }
        }
        return result;
    }

    downloadCsvData(): void {
        // Validate that sender_data exists and is an array
        if (!this.message?.sender_data) {
            this.logger.error("sender_data is not available.");
            return;
        }

        // Flatten each object in sender_data
        const flattenedData = [this.message.sender_data].map(item => this.flattenObject(item));

        // Convert flattened data to CSV using PapaParse
        const csv = Papa.unparse(flattenedData);

        // Create a Blob from the CSV string
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

        // Use FileSaver.js to save the file
        saveAs(blob, "template-messages.csv");
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    async sendToContacts(contacts: ConversationMessagingProductContact[]) {
        let senderData = this.message?.sender_data;
        if (!senderData) throw new Error("No sender data found");
        senderData = {
            ...senderData,
            messaging_product: "whatsapp",
            type: MessageType.template,
            recipient_type: "individual",
        };
        const sendPromises = contacts.map(contact => {
            const to_id = contact.id;
            const sender_data = {
                ...senderData,
                to: contact.product_details.phone_number,
            };
            const promise = this.messageController
                .sendWhatsAppMessage({
                    to_id,
                    sender_data,
                })
                .catch(err => this.handleErr(`Failed to send message to ${contact.id}`, err));
            this.userConversationStore.addUnsent(sender_data, to_id);
            return promise;
        });
        await Promise.all(sendPromises);
    }

    errorStr: string = "";
    errorData: any;
    handleErr(message: string, err: any) {
        this.errorData = err?.response?.data;
        this.errorStr = err?.response?.data?.description || message;
        this.logger.error("Async error", err);
        this.errorModal.openModal();
    }
}
