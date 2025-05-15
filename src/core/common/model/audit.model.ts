export interface Audit {
    id: string;
    created_at: Date;
    updated_at: Date;
}

export interface AuditWithDeletedAt extends Audit {
    deleted_at: Date;
}
