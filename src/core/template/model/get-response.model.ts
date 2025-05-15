import { Template } from "./template.model";
import { TemplateSummaryResponse } from "./template-summary-response.model";
import { GraphPaging } from "../../common/model/graph-paging.model";

export interface GetTemplateResponse {
    data: Template[];
    paging: GraphPaging;
    summary?: TemplateSummaryResponse;
}
