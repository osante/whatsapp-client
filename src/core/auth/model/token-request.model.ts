import { GrantType } from "../enum/grant-type.enum";

export interface TokenRequest {
    grant_type: GrantType;
    username?: string;
    password?: string;
    refresh_token?: string;
}
