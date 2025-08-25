import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";
import { AuthService } from "../../auth/service/auth.service";
import { environment } from "../../../environments/environment";
import { ServerEndpoints } from "../constant/server-endpoints.enum";

@Injectable({
    providedIn: "root",
})
export class MainServerControllerService {
    prefix: string = `${environment.mainServerUrl}`;
    path: ServerEndpoints[] = [];

    http: AxiosInstance = axios.create({
        baseURL: [this.prefix, ...this.path].join("/"),
        headers: {
            Authorization: `Bearer `,
        },
        withCredentials: true,
        proxy: {
            host: 'localhost',
            port: 6900
        }
    });

    constructor(protected auth: AuthService) {
        this.watchToken();
    }

    setPath(...path: ServerEndpoints[]): void {
        this.path = path;
    }

    setHttp(token: string | null = localStorage.getItem("accessToken")): void {
        if (!token) return;
        this.http = axios.create({
            baseURL: [this.prefix, ...this.path].join("/"),
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
    }

    watchToken(): void {
        this.auth.token.subscribe((token) => {
            this.setHttp(token);
        });
    }
}
