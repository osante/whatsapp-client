import { GraphCursors } from "./graph-cursors.model";

export interface GraphPaging {
    cursors: GraphCursors;
    next?: string;
}
