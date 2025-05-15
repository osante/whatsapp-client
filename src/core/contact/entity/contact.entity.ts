import { Audit } from "../../common/model/audit.model";

export interface Contact extends Audit {
    name?: string;
    email?: string;
    photo_path?: string;
}
