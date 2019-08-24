import {
    PLURID_DELIMITER_START,
    PLURID_DELIMITER_END,

    PLURID_METADATA_LOCATION,
    PLURID_METADATA_PROCESSOR,
} from '../constants';



export const pluridPlaneStartRE = new RegExp(`^${PLURID_DELIMITER_START}\s?`);
export const pluridPlaneEndRE = new RegExp(`^${PLURID_DELIMITER_END}$`);

export const metadataLocationRE = new RegExp(`\\|?\\s?${PLURID_METADATA_LOCATION}\\s(\\w+)\\s?\\|?`);
export const metadataProcessorRE = new RegExp(`\\|?\\s?${PLURID_METADATA_PROCESSOR}\\s((\\w+,?\\s?)+)\\s?\\|?`);
