export interface ContactAddress {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: string;
}

export interface ContactEmail {
    email: string;
    type: string;
}

export interface ContactName {
    formatted_name: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    prefix?: string;
    suffix?: string;
}

export interface ContactOrg {
    company?: string;
    department?: string;
    title?: string;
}

export interface ContactPhone {
    phone: string;
    type: string;
    wa_id?: string;
}

export interface ContactURL {
    url: string;
    type: string;
}

export interface ContactData {
    addresses?: ContactAddress[];
    birthday?: string;
    emails?: ContactEmail[];
    name: ContactName;
    org?: ContactOrg;
    phones?: ContactPhone[];
    urls?: ContactURL[];
}
