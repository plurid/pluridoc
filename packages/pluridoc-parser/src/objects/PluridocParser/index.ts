import {
    IPluridocParser,
    Plane,
} from '../../interfaces';

import {
    PLURID_DELIMITER_START,
    PLURID_DELIMITER_END,
    PLURID_METADATA_LOCATION,
    PLURID_METADATA_CONTENT,
} from '../../constants';



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
            const startRE = new RegExp(`${PLURID_DELIMITER_START}`);
            const start = startRE.test(line);
            if (start) {
                setStart = true;
                isContent = false;
                if (typeof planes[planeIndex] === 'object') {
                    planes[planeIndex].push(line);
                } else {
                    planes[planeIndex] = [line];
                }
            }

            const endRE = new RegExp(`${PLURID_DELIMITER_END}`);
            const end = endRE.test(line);
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
            const planeObject: Plane = {
                text: [],
                metadata: {},
            }

            let planeStart = false;

            for (const line of plane) {
                let setStart = false;
                const startRE = new RegExp(`${PLURID_DELIMITER_START}`);
                const start = startRE.test(line);
                if (start) {
                    setStart = true;
                    planeStart = true;
                }

                const endRE = new RegExp(`${PLURID_DELIMITER_END}`);
                const end = endRE.test(line);
                if (end) {
                    planeStart = false;
                }

                if (planeStart && !setStart) {
                    planeObject.text.push(line);
                }

                if (setStart) {
                    // handle metadata
                    const metadataLocationRE = new RegExp(`${PLURID_METADATA_LOCATION}(\.+)\\|?`);
                    const matchLocation = line.match(metadataLocationRE);
                    if (matchLocation && matchLocation[1]) {
                        planeObject.metadata.location = matchLocation[1].trim();
                    }

                    const metadataContentRE = new RegExp(`${PLURID_METADATA_CONTENT}(\.+)\\|?`);
                    const matchContent = line.match(metadataContentRE);
                    if (matchContent && matchContent[1]) {
                        const contentItem = matchContent[1].trim();
                        const content = [contentItem];
                        planeObject.metadata.content = content;
                    }
                }
            }
            planeObjects.push(planeObject);
        });

        // console.log(planeObjects);
        return planeObjects;
    }
}


export default PluridocParser;
