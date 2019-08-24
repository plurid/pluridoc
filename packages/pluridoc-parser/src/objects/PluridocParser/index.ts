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
        this.planes = this.extractPlaneContent();
    }

    public getPlanesContent = () => {
        return this.planes;
    }

    private extractPlaneContent = () => {
        const lines = this.data.split('\n');

        const plane: Plane = {
            text: [],
            metadata: {},
        }

        let planeStart = false;

        for (const line of lines) {
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
                plane.text.push(line);
            }

            if (setStart) {
                const metadataLocationRE = new RegExp(`${PLURID_METADATA_LOCATION}(\.+)\\|?`);
                const matchLocation = line.match(metadataLocationRE);
                if (matchLocation && matchLocation[1]) {
                    plane.metadata.location = matchLocation[1].trim();
                }

                const metadataContentRE = new RegExp(`${PLURID_METADATA_CONTENT}(\.+)\\|?`);
                const matchContent = line.match(metadataContentRE);
                if (matchContent && matchContent[1]) {
                    const contentItem = matchContent[1].trim();
                    const content = [contentItem];
                    plane.metadata.content = content;
                }
                // handle metadata
            }
        }

        console.log(plane);
        return [plane];
    }
}


export default PluridocParser;
