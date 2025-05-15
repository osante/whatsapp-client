import { TokenType } from "../enum/token-type.enum";

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: TokenType;
    expires_in: number;
}
