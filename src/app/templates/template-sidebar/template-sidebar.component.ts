import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TemplatePreviewComponent } from "../template-preview/template-preview.component";
import { CommonModule } from "@angular/common";
import { QueryParamsService } from "../../../core/navigation/service/query-params.service";
import { TemplateStoreService } from "../../../core/template/store/template-store.service";
import { MatIconModule } from "@angular/material/icon";
import { KeyboardNavigableList } from "../../common/keyboard/keyboard-navigable-list.base";

@Component({
    selector: "app-template-sidebar",
    imports: [
        FormsModule,
        TemplatePreviewComponent,
        CommonModule,
        MatIconModule,
    ],
    templateUrl: "./template-sidebar.component.html",
    styleUrl: "./template-sidebar.component.scss",
    standalone: true,
})
export class TemplateSidebarComponent
    extends KeyboardNavigableList
    implements OnInit
{
    private scrolling: boolean = false;

    @ViewChild("searchTextarea")
    searchTextarea!: ElementRef<HTMLTextAreaElement>;

    constructor(
        private router: Router,
        public templateStore: TemplateStoreService,
        public queryParamsService: QueryParamsService,
    ) {
        super();
    }

    adjustHeight(event: Event): void {
        const element = event.target as HTMLElement;
        if (!element) return;
        element.style.height = "auto"; // Reset height to auto to get the correct scrollHeight
        element.style.height = `${element.scrollHeight}px`; // Set height to scrollHeight
    }

    async ngOnInit() {
        await this.getTemplates();
    }

    async getTemplates(): Promise<void> {
        this.scrolling = true;

        await this.templateStore.get();

        this.scrolling = false;
    }

    onScroll(event: Event) {
        const element = event.target as HTMLElement;
        if (
            // Check if the template has scrolled to the bottom of the element
            !(
                element.scrollHeight - element.scrollTop <=
                    element.clientHeight + 100 &&
                // Check if some request is being performed
                !this.scrolling
            )
        )
            return;

        if (
            // Check if template is not searching
            !this.templateStore.searchValue
        )
            this.getTemplates();
        else if (
            this.templateStore.searchValue &&
            !this.templateStore.isExecuting &&
            !this.templateStore.pendingExecution
        )
            this.getSearchTemplates();
    }

    async getSearchTemplates(): Promise<void> {
        this.scrolling = true;

        await this.templateStore.getSearchTemplates();

        this.scrolling = false;
    }

    async getInitialSearchTemplates(): Promise<void> {
        this.scrolling = true;

        await this.templateStore.getInitialSearchTemplates();

        this.scrolling = false;
    }

    async addMessagingProductContactIdField(messagingProductContactId: string) {
        await this.templateStore.addFilter({
            text: `Messaging product contact id ${messagingProductContactId}`,
        });
    }

    resetTemplateId() {
        this.router.navigate([], {
            queryParams: this.queryParamsService.globalQueryParams,
            preserveFragment: true,
            queryParamsHandling: "replace",
        });
    }

    @ViewChildren(TemplatePreviewComponent, { read: ElementRef })
    protected rows!: QueryList<ElementRef<HTMLElement>>;

    protected onEnter(i: number) {
        this.rows.toArray()[i].nativeElement.click();
    }

    @ViewChild("draggableContainer")
    draggableContainer!: ElementRef<HTMLElement>;
    isResizing = false;
    sidebarWidth = 400;
    @HostListener("window:mousemove", ["$event"])
    private onMouseMove(event: MouseEvent) {
        if (!this.isResizing) return;
        if (!this.queryParamsService.sidebarOpen)
            this.queryParamsService.openSidebar();

        const newWidth =
            event.clientX - this.draggableContainer.nativeElement.offsetLeft;
        this.sidebarWidth = newWidth;

        if (newWidth <= 10) this.queryParamsService.closeSidebar();

        event.preventDefault();
    }

    @HostListener("window:mouseup")
    private onMouseUp() {
        this.isResizing = false;
    }

    @HostListener("window:keydown.control.shift.f", ["$event"])
    private onControlShiftF(event: KeyboardEvent) {
        event.preventDefault();
        this.searchTextarea.nativeElement.focus();
    }

    startResizing(event: MouseEvent) {
        this.isResizing = true;
        event.preventDefault(); // Prevent text selection
    }
}
