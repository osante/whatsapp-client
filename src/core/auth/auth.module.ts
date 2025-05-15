import { NgModule } from "@angular/core";
import { CommonModule as AngularCommon } from "@angular/common";
import { UrlWithHttpPipe } from "../common/pipe/url-with-http.pipe";

@NgModule({
    declarations: [],
    imports: [AngularCommon],
    providers: [UrlWithHttpPipe],
})
export class AuthModule {}
