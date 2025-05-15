export interface Plugin {
    name: string;
    path: string; // base path in router
    moduleLoader: () => Promise<any>; // for loadChildren
}
