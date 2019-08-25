export interface IPluridocServer {
    start: () => void;
    stop: () => void;
}


export interface PluridocServerOptions {
    port?: number;
    verbose?: boolean;
}
