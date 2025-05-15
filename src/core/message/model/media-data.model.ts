export interface UseMedia {
    caption?: string;
    filename?: string;
    id?: string;
    link?: string;
}

export function compareUseMedia(data1: UseMedia, data2: UseMedia) {
    if (data1?.caption !== data2?.caption) return false;

    if (data1?.link && data2?.link) return data1.link === data2.link;
    if (data1.id && data2.id) return data1.id === data2.id;
    return false;
}
