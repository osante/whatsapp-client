import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "urlWithHttp",
    standalone: true,
})
export class UrlWithHttpPipe implements PipeTransform {
    transform(value: string, secure: boolean): string {
        return `http${secure ? "s" : ""}://${value}`;
    }
}
