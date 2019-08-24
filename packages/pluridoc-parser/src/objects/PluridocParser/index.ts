import {
    IPluridocParser,
    Plane,
} from '../../interfaces';

import {
    pluridPlaneStartRE,
    pluridPlaneEndRE,
    metadataLocationRE,
    metadataProcessorRE,
} from '../../data/regex';

import {
    escapePluridPlaneDividers,
} from '../../utilities';



class PluridocParser implements IPluridocParser {
    private data: string;
    private planes: Plane[] = [];

    constructor(data: string) {
        this.data = data;
        this.planes = this.extractPlanesContent();
    }

    public getPlanesContent = () => {
        return this.planes;
    }

    /**
     * Receives a multi-line string containing multiple plurid planes
     * and returns an array of arrays of multi-line strings for each plane
     */
    private extractPlanes = (): string[][] => {
        const planes: any = [];
        const lines = this.data.split('\n');

        let planeIndex = 0;
        let setStart = false;

        for (const line of lines) {
            let isContent = true;
            const start = pluridPlaneStartRE.test(line);
            if (start) {
                setStart = true;
                isContent = false;
                if (typeof planes[planeIndex] === 'object') {
                    planes[planeIndex].push(line);
                } else {
                    planes[planeIndex] = [line];
                }
            }

            const end = pluridPlaneEndRE.test(line);
            if (end) {
                setStart = false;
                isContent = false;
                planes[planeIndex].push(line);
                planeIndex += 1;
            }

            if (setStart && isContent) {
                planes[planeIndex].push(line);
            }
        }

        return planes;
    }

    /**
     * From the planes strings extracts the content and the metadata
     */
    private extractPlanesContent = () => {
        const planes = this.extractPlanes();
        const planeObjects: any[] = [];

        planes.forEach(plane => {
            const planeObject = this.extractPlaneObject(plane);
            planeObjects.push(planeObject);
        });

        return planeObjects;
    }

    private extractPlaneObject = (plane: string[]) => {
        const planeObject: Plane = {
            text: [],
            metadata: {},
        }

        let planeStart = false;

        for (const line of plane) {
            let setStart = false;
            const start = pluridPlaneStartRE.test(line);
            if (start) {
                setStart = true;
                planeStart = true;
            }

            const end = pluridPlaneEndRE.test(line);
            if (end) {
                planeStart = false;
            }

            if (planeStart && !setStart) {
                let _line = escapePluridPlaneDividers(line);
                planeObject.text.push(_line);
            }

            if (setStart) {
                // handle metadata
                const metadata = this.extractPlaneMetadata(line);
                planeObject.metadata = { ...planeObject.metadata, ...metadata};
            }
        }

        return planeObject;
    }

    private extractPlaneMetadata = (line: string) => {
        const metadata: any = {};

        const matchLocation = line.match(metadataLocationRE);
        if (matchLocation && matchLocation[1]) {
            metadata.location = matchLocation[1].trim();
        }

        const matchProcessor = line.match(metadataProcessorRE);
        if (matchProcessor && matchProcessor[1]) {
            const processorItems = matchProcessor[1].trim().split(',');
            const processor = [ ...processorItems.map(item => item.trim()) ];
            metadata.processor = processor;
        }

        return metadata;
    }
}


export default PluridocParser;
