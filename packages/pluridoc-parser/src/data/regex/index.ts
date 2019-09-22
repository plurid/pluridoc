import {
    PLURIDOC_DELIMITER_START,
    PLURIDOC_DELIMITER_END,

    PLURIDOC_METADATA,
} from '../constants';



export const pluridocPlaneStartRE = new RegExp(`^${PLURIDOC_DELIMITER_START}\s?`);
export const pluridocPlaneEndRE = new RegExp(`^${PLURIDOC_DELIMITER_END}$`);

export const metadataLocationRE = new RegExp(`\\|?\\s?${PLURIDOC_METADATA.LOCATION}\\s(\\w+)\\s?\\|?`);
export const metadataProcessorRE = new RegExp(`\\|?\\s?${PLURIDOC_METADATA.PROCESSOR}\\s((\\w+,?\\s?)+)\\s?\\|?`);
export const metadataIdRE = new RegExp(`\\|?\\s?${PLURIDOC_METADATA.ID}\\s((\\w+,?\\s?)+)\\s?\\|?`);
export const metadataTitleRE = new RegExp(`\\|?\\s?${PLURIDOC_METADATA.TITLE}\\s((\\w+,?\\s?)+)\\s?\\|?`);
