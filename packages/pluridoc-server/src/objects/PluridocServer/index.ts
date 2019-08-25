import http from 'http';
import fs from 'fs';
import path from 'path';

import PluridocParser from '@plurid/pluridoc-parser';

import {
    IPluridocServer,
    PluridocServerOptions,
} from '../../interfaces';

import {
    DEFAULT_PLURID_PORT,
    PLURID_EXTENSION,
    PLURIDOC_EXTENSION,
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
            fs.readdirSync(process.cwd()).forEach(file => {
                const extension = path.extname(file);
                if (
                    extension === PLURID_EXTENSION
                    || extension === PLURIDOC_EXTENSION
                ) {
                    const text = fs.readFileSync(file, 'utf8');
                    const pluridocParser = new PluridocParser(text);
                    console.log('file', file);
                    console.log('text', text);
                    console.log('parsed:');
                    console.log(pluridocParser.getPlanesContent());
                }
            });
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
