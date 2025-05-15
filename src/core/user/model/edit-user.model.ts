import { Role } from "./role.model";

// Represents a user's editable fields (name and email)
export interface EditUser {
    name?: string; // Optional field, as indicated by "omitempty"
    email?: string; // Optional field, as indicated by "omitempty"
    role?: Role;
}

// Represents an editable user with an ID (inherits from RequiredId and EditUser)
export interface EditUserWithId extends EditUser {
    id: string;
}

// Represents an editable user with a password (inherits from EditUser)
export interface EditUserWithPassword extends EditUser {
    password?: string; // Optional field, as indicated by "omitempty"
}
