import http from 'http';
import fs from 'fs';
import path from 'path';

import socket from 'socket.io';

import PluridocParser from '@plurid/pluridoc-parser';
import PluridocApp from '@plurid/pluridoc-app';

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


// const io = socket(http);
// io.on('connection', (socket: any) => {
//     socket.on('writing', (msg: any) => {
//         // io.emit('writing', msg);
//         console.log(msg);
//     });
// });


class PluridocServer implements IPluridocServer {
    private server: http.Server;
    private port: number = DEFAULT_PLURID_PORT;
    private verbose: boolean = false;
    private io: any;

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

            if (req.url && !/socket.io/.test(req.url)) {
                this.handleFiles(req, res);
            }
        });

        this.io = socket(this.server);

        this.handleConnections();
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
        const requestedFile = req.url;
        const requestedFilePath = process.cwd() + requestedFile;
        console.log('requestedFilePath', requestedFilePath);

        const extension = path.extname(requestedFile);

        if (
            extension !== PLURID_EXTENSION
            && extension !== PLURIDOC_EXTENSION
        ) {
            res.end('open a file');

            // const pluridAppHTML = PluridApp.render({});
            // res.end(pluridAppHTML);

            return;
        }

        try {
            if (fs.existsSync(requestedFilePath)) {
                const text = fs.readFileSync(requestedFilePath, 'utf8');
                const pluridocParser = new PluridocParser(text);
                const content = pluridocParser.getPlanesContent();
                console.log(content);
                // res.end(content[0].text[1]);

                const pluridocApp = new PluridocApp(content, requestedFile);
                const pluridocAppHTML = pluridocApp.render();
                // console.log(pluridocAppHTML);
                res.end(pluridocAppHTML);
            }
        } catch(error) {
            console.log(error);
            res.end('open a file');

            // const pluridAppHTML = PluridApp.render({});
            // res.end(pluridAppHTML);
        }
    }

    private handleConnections () {
        this.io.on('connection', (socket: any) => {
            socket.on('writing', (msg: any) => {
                console.log(msg);
            });
        });
    }
}


export default PluridocServer;
