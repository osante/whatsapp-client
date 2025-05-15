import { Component } from "@angular/core";
import { ContactInfoComponent } from "../contact-info/contact-info.component";

@Component({
    selector: "app-new-contact",
    imports: [ContactInfoComponent],
    templateUrl: "./new-contact.component.html",
    styleUrl: "./new-contact.component.scss",
    standalone: true,
})
export class NewContactComponent {}
