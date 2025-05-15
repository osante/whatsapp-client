import { Component, Input, OnInit } from "@angular/core";
import { SmallButtonComponent } from "../../common/small-button/small-button.component";
import { MediaPreviewComponent } from "../contact-info/media-preview/media-preview.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {
    Conversation,
    ConversationMessagingProductContact,
} from "../../../core/message/model/conversation.model";
import { CommonModule } from "@angular/common";
import { MediaMode } from "./enum/media-mode.enum";
import { ConversationControllerService } from "../../../core/message/controller/conversation-controller.service";
import { DateOrderEnum } from "../../../core/common/model/date-order.model";
import { CapitalizeFirstLetterPipe } from "../../../core/common/pipe/capitalize-first-letter.pipe";
import { QueryParamsService } from "../../../core/navigation/service/query-params.service";

@Component({
    selector: "app-contact-media",
    imports: [
        CommonModule,
        SmallButtonComponent,
        MediaPreviewComponent,
        CapitalizeFirstLetterPipe,
        RouterModule,
    ],
    templateUrl: "./contact-media.component.html",
    styleUrl: "./contact-media.component.scss",
    standalone: true,
})
export class ContactMediaComponent implements OnInit {
    MediaMode = MediaMode;
    mediaModes = Object.values(MediaMode) as MediaMode[];

    @Input("messagingProductContact")
    messagingProductContact!: ConversationMessagingProductContact;

    currentMediaMode: MediaMode = MediaMode.image;

    // Pagination parameters and media content
    mediaLimit: number = 40;
    media = new Map<MediaMode, Conversation[]>(
        Object.values(MediaMode).map((value) => [value, []]),
    ); // Media content
    scrolling = new Map<MediaMode, boolean>(
        Object.values(MediaMode).map((value) => [value, false]),
    ); // Scrolling status
    reachedMaxMediaLimit = new Map<MediaMode, boolean>(
        Object.values(MediaMode).map((value) => [value, false]),
    );

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private conversationController: ConversationControllerService,
        private queryParamsService: QueryParamsService,
    ) {}

    ngOnInit(): void {
        this.watchQueryParams();
    }

    async getMedia(mode: MediaMode) {
        this.scrolling.set(mode, true);

        // New media
        const newMedia =
            await this.conversationController.conversationContentLike(
                this.messagingProductContact.id,
                `"type"\\s*:\\s*"(${mode})"`,
                undefined,
                {
                    limit: this.mediaLimit,
                    offset: (this.media.get(mode) as Conversation[])?.length,
                },
                { created_at: DateOrderEnum.desc },
            );
        if (newMedia.length === 0) {
            this.reachedMaxMediaLimit.set(mode, true);
            this.scrolling.set(mode, false);
            return;
        }
        this.media.get(mode)?.push(...newMedia);

        this.scrolling.set(mode, false);
        return;
    }

    onScroll(event: Event, mode: MediaMode) {
        const element = event.target as HTMLElement;

        if (
            element.scrollHeight - element.scrollTop <=
                element.clientHeight + 100 &&
            !this.scrolling.get(mode) &&
            !this.reachedMaxMediaLimit.get(mode)
        )
            return this.getMedia(mode);

        return;
    }

    async selectMediaMode(mode: MediaMode) {
        await this.router.navigate([], {
            queryParams: {
                "contact_media.mode": mode,
                ...this.queryParamsService.globalQueryParams,
            },
            queryParamsHandling: "merge",
        });
    }

    watchQueryParams() {
        this.route.queryParams.subscribe(async (params) => {
            const messagingProductContactId =
                params["messaging_product_contact.id"];
            if (
                !messagingProductContactId ||
                messagingProductContactId != this.messagingProductContact.id ||
                params["mode"] != "contact_media"
            )
                return;
            const currentModeKey = params["contact_media.mode"];
            if (!currentModeKey) return this.selectMediaMode(MediaMode.image);
            const currentModeKeyConverted =
                currentModeKey as keyof typeof MediaMode;
            const currentMode = MediaMode[currentModeKeyConverted];
            this.currentMediaMode = currentMode;

            if (
                !this.scrolling.get(currentMode) &&
                !this.reachedMaxMediaLimit.get(currentMode)
            )
                await this.getMedia(currentMode);
            return;
        });
    }
}
