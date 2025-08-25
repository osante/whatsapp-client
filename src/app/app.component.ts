import { Component, HostListener, OnInit } from "@angular/core";
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
export class AppComponent implements OnInit {
    constructor(private titleService: Title) {
        this.titleService.setTitle(environment.appTitle);
    }

    ngOnInit() {
        this.setAppHeight();
    }

    title = "wacraft-client";

    @HostListener('window:resize')
    setAppHeight() {
        document.documentElement.style.setProperty(
            '--app-height',
            `${window.innerHeight}px`
        );
    }
}
