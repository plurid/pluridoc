import * as http from 'http';

import {
    IPluridocServer,
    PluridocServerOptions,
} from '../../interfaces';

import {
    DEFAULT_PLURID_PORT,
} from '../../constants';




class PluridocServer implements IPluridocServer {
    private server: any;
    private port: number = DEFAULT_PLURID_PORT;

    constructor(options?: PluridocServerOptions) {
        if (options && options.port) {
            this.port = options.port;
        }

        this.server = http.createServer((req, res) => {
            res.end('works');
        });
    }

    public start() {
        this.server.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }

    public stop() {
        this.server.close();
    }
}


export default PluridocServer;
