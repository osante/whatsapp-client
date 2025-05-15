export interface SectionData {
    title: string; // Title of the section
    rows: Array<{
        id: string; // Unique identifier for the row
        title: string; // Title of the row
        description?: string; // Optional description
    }>;
}
