import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Template } from "../../../core/template/model/template.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TemplateMessageBuilderComponent } from "../template-message-builder/template-message-builder.component";
import { TemplateStoreService } from "../../../core/template/store/template-store.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-template-details",
    imports: [
        CommonModule,
        FormsModule,
        TemplateMessageBuilderComponent,
        MatIconModule,
    ],
    templateUrl: "./template-details.component.html",
    styleUrl: "./template-details.component.scss",
    standalone: true,
})
export class TemplateDetailsComponent implements OnInit {
    template?: Template;
    templateName?: string;

    constructor(
        private templateStore: TemplateStoreService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.watchQueryParams();
    }

    watchQueryParams() {
        this.route.queryParams.subscribe(async (params) => {
            const templateName = params["template.name"];
            if (!(templateName != this.templateName))
                return await this.loadTemplate();
            this.templateName = templateName;
            return await this.loadTemplate();
        });
    }

    async loadTemplate() {
        if (!this.templateName) return (this.template = undefined);
        this.template = await this.templateStore.getByName(this.templateName);
    }

    // Copy the given value to the clipboard
    async copyToClipboard(value?: string) {
        if (value) {
            await navigator.clipboard.writeText(value);
        }
    }
}
