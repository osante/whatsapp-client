import { GraphCursors } from "../../common/model/graph-cursors.model";
import { TemplateFields } from "./template-fields.model";
import { TemplateSummaryResponse } from "./template-summary-response.model";
import { TemplateSummary } from "./template-summary.model";

export interface TemplateQueryParams extends GraphCursors {
    name?: string;
    content?: string;
    language?: string;
    status?: string;
    category?: string;
    name_or_content?: string;
    limit?: number;

    fields?: TemplateFields[]; // Fields to be returned.
    summary?: TemplateSummary[]; // Summary to be returned.
}
