import { MessageType } from "../../message/model/message-type.model";
import { TemplateButton } from "../../template/model/template-component.model";
import { UseMedia } from "../../message/model/media-data.model";

export interface InterpolatedTemplate {
    /**
     * The text content for the header section of the template.
     */
    headerText: string;

    /**
     * The type of the header, determining how it should be rendered.
     * For example, it could be plain text, an image, video, etc.
     */
    headerType: MessageType;

    /**
     * Media data associated with the header if the header includes media content.
     * This could include URLs to images, videos, etc.
     */
    headerUseMedia: UseMedia;

    /**
     * The text content for the body section of the template.
     */
    bodyText: string;

    /**
     * The text content for the footer section of the template.
     */
    footerText: string;

    /**
     * An array of buttons included in the template.
     * Each button can have properties like label, action, etc.
     */
    buttons: TemplateButton[];
}
