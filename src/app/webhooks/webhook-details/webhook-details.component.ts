import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { WebhookLogsComponent } from "../webhook-logs/webhook-logs.component";
import { MatIconModule } from "@angular/material/icon";
import { HttpMethod } from "../../../core/common/model/http-methods.model";
import { Webhook } from "../../../core/webhook/entity/webhook.entity";
import { QueryParamsService } from "../../../core/navigation/service/query-params.service";
import { WebhookControllerService } from "../../../core/webhook/controller/webhook-controller.service";
import { WebhookStoreService } from "../../../core/webhook/store/webhook-store.service";
import { Event } from "../../../core/webhook/model/event.model";
import { NGXLogger } from "ngx-logger";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "app-webhook-details",
    imports: [
        CommonModule,
        FormsModule,
        WebhookLogsComponent,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: "./webhook-details.component.html",
    styleUrl: "./webhook-details.component.scss",
    standalone: true,
})
export class WebhookDetailsComponent implements OnInit {
    HttpMethod = HttpMethod;
    Event = Event;

    webhook!: Webhook;
    webhookId?: string;

    isEditing = false;

    constructor(
        private queryParamsService: QueryParamsService,
        private webhookController: WebhookControllerService,
        private route: ActivatedRoute,
        private router: Router,
        private webhookStore: WebhookStoreService,
        private logger: NGXLogger,
    ) {}

    ngOnInit(): void {
        this.watchQueryParams();
    }

    async saveChanges() {
        if (this.webhook)
            try {
                if (!this.webhookId) {
                    const wh = await this.webhookController.create({
                        url: this.webhook.url,
                        authorization: this.webhook.authorization,
                        event: this.webhook.event,
                        http_method: this.webhook.http_method,
                        timeout: this.webhook.timeout,
                    });
                    await this.router.navigate([], {
                        queryParams: {
                            "webhook.id": wh.id,
                            ...this.queryParamsService.globalQueryParams,
                        },
                        preserveFragment: true,
                        queryParamsHandling: "replace",
                    });
                    window.location.reload();
                    return;
                }
                await this.webhookController.update({
                    id: this.webhookId,
                    url: this.webhook.url,
                    authorization: this.webhook.authorization,
                    event: this.webhook.event,
                    http_method: this.webhook.http_method,
                    timeout: this.webhook.timeout,
                });
                this.isEditing = false;
                return;
            } catch (error) {
                this.logger.error("Error updating user", error);
            }
    }

    watchQueryParams() {
        this.route.queryParams.subscribe(async (params) => {
            const webhookId = params["webhook.id"];
            if (!(webhookId != this.webhookId)) return await this.loadWebhook();
            this.webhookId = webhookId;
            return await this.loadWebhook();
        });
    }

    async loadWebhook() {
        if (!this.webhookId) {
            this.webhook = {
                id: "",
                url: "",
                http_method: HttpMethod.POST,
                timeout: 0,
                event: Event.ReceiveWhatsAppMessage,
                created_at: new Date(),
                updated_at: new Date(),
            };
            this.isEditing = true;
            return;
        }
        this.isEditing = false;
        this.webhook = await this.webhookStore.getById(this.webhookId);
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    cancelEdit() {
        if (!this.webhookId) {
            this.webhook = {
                id: "",
                url: "",
                http_method: HttpMethod.POST,
                timeout: 0,
                event: Event.ReceiveWhatsAppMessage,
                created_at: new Date(),
                updated_at: new Date(),
            };
            this.isEditing = true;
            return;
        }
        this.isEditing = false;
        this.loadWebhook();
    }

    async delete() {
        if (!this.webhookId) return;

        // Show confirmation alert
        const confirmed = window.confirm(
            "Are you sure you want to delete this webhook? This action cannot be undone.",
        );

        // If the user confirms, proceed with the deletion
        if (confirmed) {
            try {
                await this.webhookController.delete(this.webhookId);
                await this.resetWebhookId(); // Call to reset or clean up after deletion
                window.location.reload();
            } catch (error) {
                this.logger.error("Error deleting webhook:", error);
            }
        }
    }

    async resetWebhookId() {
        await this.router.navigate([], {
            queryParams: this.queryParamsService.globalQueryParams,
            preserveFragment: true,
            queryParamsHandling: "replace",
        });
    }

    // Copy the given value to the clipboard
    async copyToClipboard(value?: string) {
        if (!value) return;
        await navigator.clipboard.writeText(value);
    }
}
