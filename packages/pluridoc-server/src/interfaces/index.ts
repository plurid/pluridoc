export interface IPluridocServer {
    start: () => void;
    stop: () => void;
    newPlurid: (filename?: string) => void;
    newPluridoc: (filename?: string) => void;
}


export interface PluridocServerOptions {
    port?: number;
    verbose?: boolean;
}
