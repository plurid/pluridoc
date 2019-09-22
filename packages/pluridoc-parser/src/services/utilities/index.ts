import {
    PluridocPlane,
} from '../../data/interfaces';



export const escapePluridocPlaneDividers = (line: string) => {
    let _line = line.replace('\\<<<', '<<<');
    _line = _line.replace('\\>>>', '>>>');
    return _line;
}


export const pluridocDataToPluridocString = (
    content: PluridocPlane[],
): string => {
    let contentString = '';

    for (const [index, plane] of Object.entries(content)) {
        const {
            metadata,
            text,
        } = plane;

        let metadataString = '';

        if (index !== '0') {
            metadataString += '\n<<<';
        } else {
            metadataString += '<<<';
        }

        let metadataIndex = 0;
        for (const [key, value] of Object.entries(metadata)) {
            const divider = metadataIndex === 0
                ? ' '
                : ' | ';
            metadataString += divider + `${key}: ${value}`;
            metadataIndex += 1;
        }

        contentString += metadataString + '\n';

        for (const textLine of text) {
            contentString += textLine + '\n';
        }

        contentString += '>>>\n';
    }

    return contentString;
}


/**
 * Updates the plurid plane with id `pluridPlaneID`
 * from the `text` with the `updatedPluridPlaneText`.
 *
 * @param text
 * @param pluridPlaneID
 * @param updatedPluridPlaneText
 */
export const updatePluridPlaneWithID = (
    text: string,
    pluridPlaneID: string,
    updatedPluridPlaneText: string,
): string => {
    const planeIDRE = new RegExp(`(<<<(.*)id: ${pluridPlaneID}(.*)\\n((.*[\\s\\S])*?)>>>)`, 'im');
    const planeMatch = text.match(planeIDRE);

    if (planeMatch && planeMatch[0] && planeMatch[4]) {
        const planeTextFull = planeMatch[0];
        const planeText = planeMatch[4];
        const updatedPlaneText = planeTextFull.replace(planeText, updatedPluridPlaneText + '\n');
        const updatedText = text.replace(planeTextFull, updatedPlaneText);
        return updatedText;
    }

    return text;
}
