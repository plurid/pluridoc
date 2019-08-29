import http from 'http';
import fs from 'fs';
import path from 'path';

import open from 'open';
import socket from 'socket.io';

import PluridocParser from '@plurid/pluridoc-parser';
import PluridocApp from '@plurid/pluridoc-app';

import {
    IPluridocServer,
    PluridocServerOptions,
    PluridocServerStartOptions,
} from '../../interfaces';

import {
    DEFAULT_PLURID_PORT,
    PLURID_EXTENSION,
    PLURIDOC_EXTENSION,
    FAVICON,
} from '../../constants';

import {
    defaultServerStartOptions,
} from '../../data';

import {
    checkAvailablePort,
} from '../../utilities';



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
            // console.log('request arrived for', req.url);

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

        process.addListener('SIGINT', () => {
            this.stop();
            process.exit(0);
        });
    }

    public async start(options = defaultServerStartOptions) {
        this.port = await checkAvailablePort(this.port);
        const serverlink = `http://localhost:${this.port}`;
        if (this.verbose) {
            console.log(`\n\tPluridoc Server Started on Port ${this.port}: ${serverlink}\n`);
        }
        this.server.listen(this.port);
        if (options.open) {
            open(serverlink);
        }
    }

    public stop() {
        if (this.verbose) {
            console.log(`\n\tPluridoc Server Closed on Port ${this.port}\n`);
        }

        this.server.close();
    }

    public newPlurid (filename: string = 'newplurid') {
        const file = filename + PLURID_EXTENSION;

        if (fs.existsSync(file)) {
            if (this.verbose) {
                console.log(`\tCould not Create a New ${PLURID_EXTENSION} File: ${filename} Already Exists.`);
            }
            return;
        }

        fs.writeFileSync(file, '');

        if (!this.server.address()) {
            const options: PluridocServerStartOptions = {
                open: false,
            };
            this.start(options);
        }

        const filelink = `http://localhost:${this.port}/${file}`;
        if (this.verbose) {
            console.log(`\tCreated a New ${PLURID_EXTENSION} File: ${filename}`);
            console.log(`\tOpen ${filelink}\n`);
        }
        open(filelink);
    }

    public newPluridoc (filename: string = 'newpluridoc') {
        const file = filename + PLURIDOC_EXTENSION;

        if (fs.existsSync(file)) {
            if (this.verbose) {
                console.log(`\tCould not Create a New ${PLURIDOC_EXTENSION} File: ${filename} Already Exists.`);
            }
            return;
        }

        fs.writeFileSync(file, '');

        if (!this.server.address()) {
            const options: PluridocServerStartOptions = {
                open: false,
            };
            this.start(options);
        }

        const filelink = `http://localhost:${this.port}/${file}`;
        if (this.verbose) {
            console.log(`\tCreated a New ${PLURIDOC_EXTENSION} File: ${filename}`);
            console.log(`\tOpen ${filelink}\n`);
        }

        open(filelink);
    }

    private handleFiles (req: any, res: any) {
        const requestedFile = req.url;
        const requestedFilePath = process.cwd() + requestedFile;
        // console.log('requestedFilePath', requestedFilePath);

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
                // console.log(content);
                // res.end(content[0].text[1]);

                const pluridocApp = new PluridocApp(content, requestedFile);
                const pluridocAppHTML = pluridocApp.render();
                // console.log(pluridocAppHTML);
                res.end(pluridocAppHTML);
            }
        } catch(error) {
            // console.log(error);
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
