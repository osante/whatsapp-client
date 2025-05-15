import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GoogleMapsModule } from "@angular/google-maps";
import { Title } from "@angular/platform-browser";
import { environment } from "../environments/environment";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, GoogleMapsModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    standalone: true,
})
export class AppComponent {
    constructor(private titleService: Title) {
        this.titleService.setTitle(environment.appTitle);
    }

    title = "wacraft-client";
}
