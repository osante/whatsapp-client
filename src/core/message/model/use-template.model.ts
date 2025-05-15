import { TemplateLanguage } from "./template-language.model";
import { UseTemplateComponent } from "./use-template-component.model";

export interface UseTemplate {
    name: string;
    language: TemplateLanguage;
    components: UseTemplateComponent[];
}

export function compareUseTemplate(a: UseTemplate, b: UseTemplate): boolean {
    return a.name === b.name && a.language.code === b.language.code;
}
