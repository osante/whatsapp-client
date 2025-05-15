import { TemplateComponent } from "./template-component.model";

export interface Template {
    id: string;
    name: string;
    language?: string;
    status?: string;
    category?: string;
    components: TemplateComponent[];
}
