export interface IPluridocParser {
    getPlanesContent: () => Plane[];
}


export interface Plane {
    text: string[];
    metadata: PlaneMetadata;
}


export interface PlaneMetadata {
    location?: string;
    content?: string[]
}
