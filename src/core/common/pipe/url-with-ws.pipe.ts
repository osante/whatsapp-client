import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "urlWithWs",
    standalone: true,
})
export class UrlWithWsPipe implements PipeTransform {
    transform(value: string, secure: boolean): string {
        return `ws${secure ? "s" : ""}://${value}`;
    }
}
