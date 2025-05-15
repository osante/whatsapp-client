export interface NavItem {
    route: (string | number)[];
    fragment?: string;
    visible: () => boolean;
}
