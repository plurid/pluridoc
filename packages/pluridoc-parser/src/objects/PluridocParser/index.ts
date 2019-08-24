import {
    IPluridocParser
} from '../../interfaces';



class PluridocParser implements IPluridocParser {
    private data: string;

    constructor(data: string) {
        this.data = data;
    }

}


export default PluridocParser;
