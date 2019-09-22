export interface IPluridocParser {
    getPlanesContent: () => PluridocPlane[];
}


export interface PluridocPlane {
    text: string[];
    metadata: PluridocPlaneMetadata;
}


export interface PluridocPlaneMetadata {
    id?: string;
    title?: string;
    location?: string;
    processor?: string[];
}
