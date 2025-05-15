import { UseMedia } from "../../message/model/media-data.model";
import { ButtonType } from "./button-type.model";
import { TemplateComponentFormat } from "./template-component-format.model";
import { TemplateComponentType } from "./template-component-type.model";

export interface TemplateComponent {
    type: TemplateComponentType;
    format?: TemplateComponentFormat;
    text?: string;

    image?: UseMedia;
    video?: UseMedia;
    audio?: UseMedia;
    document?: UseMedia;
    sticker?: UseMedia;
    date_time?: {
        fallback_value: string;
    };
    currency?: {
        fallback_value: string;
        code: string;
        amount_1000: number;
    };
    buttons?: TemplateButton[];

    example?: ComponentExample;
}

export interface TemplateButton {
    type: ButtonType;

    text?: string;
    url?: string;
    phone_number?: string;
    example?: string | string[]; // Single string in case of type URL and array in case of type T

    flow_id?: string;
    flow_action?: string;
    navigate_screen?: string;
}

export interface ComponentExample {
    header_text?: string[];
    body_text?: string[][];
    header_handle?: string[];
}
