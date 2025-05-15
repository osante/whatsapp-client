export interface WhereDate {
    created_at_leq?: Date;
    updated_at_leq?: Date;
    created_at_geq?: Date;
    updated_at_geq?: Date;
}

export interface WhereDateWithDeletedAt extends WhereDate {
    deleted_at_leq?: Date;
    deleted_at_geq?: Date;
}
