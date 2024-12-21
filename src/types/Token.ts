export interface Token {
    id: number;
    token: string;
    user_id: number;
    created_at: Date;
    expires_at: Date;
}
