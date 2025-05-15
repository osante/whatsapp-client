import { Role } from "./role.model";

export interface Query {
    id?: string;
    name?: string;
    email?: string;
    role?: Role;
}
