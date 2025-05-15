import { Component, OnInit, Renderer2 } from "@angular/core";
import { UserControllerService } from "../../core/user/controller/user-controller.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UnreadMode } from "../../core/local-config/model/unread-mode.model";
import { LocalSettingsService } from "../local-settings.service";
import { SmallButtonComponent } from "../common/small-button/small-button.component";
import { AuthService } from "../../core/auth/service/auth.service";
import { UserStoreService } from "../../core/user/store/user-store.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { ThemeMode } from "../../core/common/model/theme-modes.model";
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { RoutePath } from "../app.routes";
import { NGXLogger } from "ngx-logger";

@Component({
    selector: "app-account",
    imports: [
        CommonModule,
        FormsModule,
        SmallButtonComponent,
        MatTooltipModule,
        MatIconModule,
        SidebarComponent,
    ],
    templateUrl: "./account.component.html",
    styleUrl: "./account.component.scss",
    standalone: true,
})
export class AccountComponent implements OnInit {
    RoutePath = RoutePath;

    ThemeMode = ThemeMode;
    UnreadMode = UnreadMode;

    isEditing: boolean = false;
    isDropdownOpen: boolean = false;

    constructor(
        private userController: UserControllerService,
        public userStore: UserStoreService,
        public auth: AuthService,
        public localSettings: LocalSettingsService,
        private renderer: Renderer2,
        private logger: NGXLogger,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.userStore.loadCurrent();
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    async saveChanges() {
        if (this.userStore.currentUser) {
            try {
                await this.userController.updateCurrentUser(
                    this.userStore.currentUser,
                );
                this.isEditing = false;
                this.userStore.currentUser.password = ""; // Clear password
            } catch (error) {
                this.logger.error("Error updating user", error);
            }
        }
    }

    cancelEdit() {
        this.isEditing = false;
        this.userStore.getCurrent(); // Revert changes
    }

    // Method to toggle the theme
    toggleTheme(theme: ThemeMode) {
        this.localSettings.setThemeMode(theme);
        this.localSettings.updateTheme(this.renderer);
    }

    toggleMarkAsRead(autoMarkAsRead: boolean) {
        this.localSettings.setAutoMarkAsRead(autoMarkAsRead);
    }
}
