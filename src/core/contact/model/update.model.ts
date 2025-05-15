import { CreateContact } from "./create.model";

export interface UpdateContact extends CreateContact {
    id: string;
}
