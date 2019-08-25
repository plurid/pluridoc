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
    FAVICON,
} from '../../constants';




class PluridocServer implements IPluridocServer {
    private server: http.Server;
    private port: number = DEFAULT_PLURID_PORT;
    private verbose: boolean = false;

    constructor(options?: PluridocServerOptions) {
        if (options) {
            if (options.port) {
                this.port = options.port;
            }

            if (options.verbose) {
                this.verbose = options.verbose;
            }
        }

        this.server = http.createServer((req, res) => {
            console.log('request arrived for', req.url);

            if (req.url === '/favicon.ico') {
                res.writeHead(200, {'Content-Type': 'image/x-icon'} );
                fs.createReadStream(FAVICON).pipe(res);
                return;
            }

            this.handleFiles(req, res);
        });
    }

    public start() {
        if (this.verbose) {
            console.log(`Server started on port ${this.port}`);
        }

        this.server.listen(this.port);
    }

    public stop() {
        if (this.verbose) {
            console.log(`Server closed on port ${this.port}`);
        }

        this.server.close();
    }

    private handleFiles (req: any, res: any) {
        fs.readdirSync(process.cwd()).forEach(file => {
            const extension = path.extname(file);
            if (
                extension === PLURID_EXTENSION
                || extension === PLURIDOC_EXTENSION
            ) {
                const text = fs.readFileSync(file, 'utf8');
                const pluridocParser = new PluridocParser(text);
                const content = pluridocParser.getPlanesContent();
                if (req.url === '/' + file) {
                    console.log(content);
                    console.log(file);
                    res.end(content[0].text[1]);
                }
            }
        });

        res.end('open a file');
    }
}


export default PluridocServer;
