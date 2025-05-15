import { Component } from "@angular/core";
import { NodeRedComponent } from "../node-red/node-red.component";
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { RoutePath } from "../app.routes";

@Component({
    selector: "app-automation",
    imports: [SidebarComponent, NodeRedComponent],
    templateUrl: "./automation.component.html",
    styleUrl: "./automation.component.scss",
    standalone: true,
})
export class AutomationComponent {
    RoutePath = RoutePath;
}
