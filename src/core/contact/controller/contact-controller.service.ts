import { Injectable } from "@angular/core";
import { MainServerControllerService } from "../../common/controller/main-server-controller.service";
import { AuthService } from "../../auth/service/auth.service";
import { ServerEndpoints } from "../../common/constant/server-endpoints.enum";
import { Contact } from "../entity/contact.entity";
import { UpdateContact } from "../model/update.model";
import { CreateContact } from "../model/create.model";

@Injectable({
    providedIn: "root",
})
export class ContactControllerService extends MainServerControllerService {
    constructor(auth: AuthService) {
        super(auth);
        this.setPath(ServerEndpoints.contact);
        this.setHttp();
    }

    async create(data: CreateContact): Promise<Contact> {
        return (await this.http.post(``, data)).data;
    }

    async update(data: UpdateContact): Promise<Contact> {
        return (await this.http.put(``, data)).data;
    }

    async delete(id: string): Promise<Contact> {
        return (await this.http.delete(``, { data: { id } })).data;
    }
}
