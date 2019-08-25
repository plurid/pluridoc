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
    private verbose: boolean = false;

    constructor(options?: PluridocServerOptions) {
        if (options && options.port) {
            if (options.port) {
                this.port = options.port;
            }

            if (options.verbose) {
                this.verbose = options.verbose;
            }
        }


        this.server = http.createServer((req, res) => {
            res.end('works');
        });
    }

    public start() {
        if (this.verbose) {
            console.log(`Server started on port ${this.port}`);
        }

        this.server.listen(this.port, () => {
            console.log(`--- Server started on port ${this.port}`);
            console.log(process.cwd());
        });
    }

    public stop() {
        if (this.verbose) {
            console.log(`Server closed on port ${this.port}`);
        }

        this.server.close();
    }
}


export default PluridocServer;
