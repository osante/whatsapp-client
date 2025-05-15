export enum DateOrderEnum {
    asc = "asc",
    desc = "desc",
}

export interface DateOrder {
    created_at?: DateOrderEnum;
    updated_at?: string;
}
export interface DateOrderWithDeletedAt extends DateOrder {
    deleted_at?: DateOrderEnum;
}
