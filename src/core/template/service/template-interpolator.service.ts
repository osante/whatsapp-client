import { Injectable } from "@angular/core";
import { Template } from "../../template/model/template.model";
import { Conversation } from "../../message/model/conversation.model";
import { MessageType } from "../../message/model/message-type.model";
import { UseTemplate } from "../../message/model/use-template.model";
import { ComponentParameters } from "../../message/model/use-template-component.model";
import { UseMedia } from "../../message/model/media-data.model";
import {
    TemplateButton,
    TemplateComponent,
} from "../model/template-component.model";
import { TemplateComponentType } from "../model/template-component-type.model";
import { TemplateComponentFormat } from "../model/template-component-format.model";

@Injectable({
    providedIn: "root",
})
export class TemplateInterpolatorService {
    constructor() {}

    interpolateTemplate(
        template: Template,
        message: Conversation,
        getTemplateData: () => UseTemplate,
    ): {
        headerText: string;
        headerType: MessageType;
        headerUseMedia: UseMedia;
        bodyText: string;
        footerText: string;
        buttons: TemplateButton[];
    } {
        let headerText = "";
        let headerType: MessageType = MessageType.text;
        let headerUseMedia: UseMedia = {};
        let bodyText = "";
        let footerText = "";
        let buttons: TemplateButton[] = [];

        template.components.forEach((component) => {
            switch (component.type.toLowerCase()) {
                case TemplateComponentType.header.toLowerCase():
                    const header = this.loadHeader(component, getTemplateData);
                    headerText = header.headerText;
                    headerType = header.headerType;
                    headerUseMedia = header.headerUseMedia;
                    break;
                case TemplateComponentType.body.toLowerCase():
                    bodyText = this.loadBody(component, getTemplateData);
                    break;
                case TemplateComponentType.footer.toLowerCase():
                    footerText = this.loadFooter(component);
                    break;
                case TemplateComponentType.buttons.toLowerCase():
                    buttons = this.loadButtons(component);
                    break;
            }
        });

        return {
            headerText,
            headerType,
            headerUseMedia,
            bodyText,
            footerText,
            buttons,
        };
    }

    private loadHeader(
        component: TemplateComponent,
        getTemplateData: () => UseTemplate,
    ) {
        const example = component.example;
        let headerType: MessageType = component?.format
            ? (component?.format.toLowerCase() as MessageType)
            : MessageType.text;
        let headerText = "";
        let headerUseMedia: UseMedia = {};

        if (
            example?.header_handle &&
            component.format?.toLowerCase() !==
                TemplateComponentFormat.Text.toLowerCase()
        ) {
            example.header_handle.forEach((_, i) => {
                if (!component.format) return;
                const componentParams = this.findComponentParameter(
                    TemplateComponentType.header,
                    i,
                    getTemplateData,
                );

                const key = component.format.toLowerCase() as keyof UseMedia;

                // Type Assertion: Inform TypeScript that componentParams has the key from UseMedia
                const media = (componentParams as any)[
                    key
                ] as UseMedia[keyof UseMedia];

                if (media) {
                    headerUseMedia = {
                        ...headerUseMedia,
                        [key]: media,
                    };
                }
            });
            return { headerText, headerType, headerUseMedia };
        }

        if (
            component.format?.toLowerCase() ===
                TemplateComponentFormat.Text.toLowerCase() &&
            component.text
        ) {
            headerText = component.text;

            if (example?.header_text) {
                example.header_text.forEach((_, i) => {
                    const replaceAtIndex = this.findComponentParameter(
                        TemplateComponentType.header,
                        i,
                        getTemplateData,
                    ).text;
                    if (replaceAtIndex) {
                        headerText = headerText.replace(
                            new RegExp(`\\{\\{${i + 1}\\}\\}`, "g"),
                            replaceAtIndex,
                        );
                    }
                });
            }
        }

        return { headerText, headerType, headerUseMedia };
    }

    private loadBody(
        component: TemplateComponent,
        getTemplateData: () => UseTemplate,
    ): string {
        if (!component.text) return "";
        const example = component.example;
        let bodyText = component.text;

        if (example?.body_text) {
            example.body_text.forEach((_, i) => {
                const replaceAtIndex = this.findComponentParameter(
                    TemplateComponentType.body,
                    i,
                    getTemplateData,
                ).text;
                if (replaceAtIndex) {
                    bodyText = bodyText.replace(
                        new RegExp(`\\{\\{${i + 1}\\}\\}`, "g"),
                        replaceAtIndex,
                    );
                }
            });
        }

        return bodyText;
    }

    private loadFooter(component: TemplateComponent): string {
        return component.text || "";
    }

    private loadButtons(component: TemplateComponent): TemplateButton[] {
        return component.buttons || [];
    }

    private findComponentParameter(
        componentType: TemplateComponentType,
        index: number,
        getTemplateData: () => UseTemplate,
    ): ComponentParameters {
        const component = getTemplateData().components.find(
            (comp) => comp.type.toLowerCase() === componentType.toLowerCase(),
        );
        if (!component) {
            throw new Error(`Component not found for ${componentType}`);
        }
        return component.parameters[index];
    }
}
