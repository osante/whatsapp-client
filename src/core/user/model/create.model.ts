import { Role } from "./role.model";

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    role?: Role;
}
