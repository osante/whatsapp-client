export interface TextData {
    body: string;
    preview_url: boolean;
}

export function compareTextData(a: TextData, b: TextData): boolean {
    return a.body === b.body && a.preview_url === b.preview_url;
}
