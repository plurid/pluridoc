import {
    PLURID_DELIMITER_START,
    PLURID_DELIMITER_END,

    PLURID_METADATA_LOCATION,
    PLURID_METADATA_CONTENT,
} from '../constants';



export const pluridPlaneStartRE = new RegExp(`^${PLURID_DELIMITER_START}\s?`);
export const pluridPlaneEndRE = new RegExp(`^${PLURID_DELIMITER_END}$`);

export const metadataLocationRE = new RegExp(`${PLURID_METADATA_LOCATION}(\.+)\\|?`);
export const metadataContentRE = new RegExp(`${PLURID_METADATA_CONTENT}(\.+)\\|?`);
