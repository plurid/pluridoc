export interface PluridocServer {
    start: () => void;
    stop: () => void;
    newPlurid: (filename?: string) => void;
    newPluridoc: (filename?: string) => void;
}


export interface PluridocServerOptions {
    port?: number;
    verbose?: boolean;
}


export interface PluridocServerStartOptions {
    open: boolean;
}
