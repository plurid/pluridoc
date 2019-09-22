import http from 'http';
import fs from 'fs';
import path from 'path';

import open from 'open';
import socket from 'socket.io';

import PluridocParser, {
    updatePluridPlaneWithID,
} from '@plurid/pluridoc-parser';
import PluridocApp, {
    IO_CONNECTIONS,
    IOMessageFileWrite,
} from '@plurid/pluridoc-app';

import {
    PluridocServer as IPluridocServer,
    PluridocServerOptions,
    PluridocServerStartOptions,
} from '../../data/interfaces';

import {
    DEFAULT_PLURID_PORT,
    PLURID_EXTENSION,
    PLURIDOC_EXTENSION,
    FAVICON,
} from '../../data/constants';

import {
    defaultServerStartOptions,
} from '../../data/defaults';

import {
    checkAvailablePort,
    createPluridocFile,
    checkAndSetContentIDs,
} from '../../services/utilities';



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

    public async newPlurid (filename: string = 'newplurid') {
        const file = filename + PLURID_EXTENSION;

        if (fs.existsSync(file)) {
            if (this.verbose) {
                console.log(`\n\tCould not Create a New ${PLURID_EXTENSION} File: ${file} Already Exists.\n`);
            }
            return;
        }

        if (!this.server.address()) {
            const options: PluridocServerStartOptions = {
                open: false,
            };
            await this.start(options);
        }

        fs.writeFileSync(file, '');

        const filelink = `http://localhost:${this.port}/${file}`;
        if (this.verbose) {
            console.log(`\tCreated a New ${PLURID_EXTENSION} File: ${file}`);
            console.log(`\tOpen ${filelink}\n`);
        }
        open(filelink);
    }

    public async newPluridoc (filename: string = 'newpluridoc') {
        const file = filename + PLURIDOC_EXTENSION;

        if (fs.existsSync(file)) {
            if (this.verbose) {
                console.log(`\n\tCould not Create a New ${PLURIDOC_EXTENSION} File: ${file} Already Exists.\n`);
            }
            return;
        }

        if (!this.server.address()) {
            const options: PluridocServerStartOptions = {
                open: false,
            };
            await this.start(options);
        }

        await createPluridocFile(filename);

        const filelink = `http://localhost:${this.port}/${file}`;
        if (this.verbose) {
            console.log(`\tCreated a New ${PLURIDOC_EXTENSION} File: ${file}`);
            console.log(`\tOpen ${filelink}\n`);
        }

        open(filelink);
    }

    private async handleFiles (req: any, res: any) {
        const requestedFile = req.url;
        const requestedFilePath = process.cwd() + requestedFile;
        // console.log('requestedFilePath', requestedFilePath);

        const extension = path.extname(requestedFile);

        if (
            extension !== PLURID_EXTENSION
            && extension !== PLURIDOC_EXTENSION
        ) {
            const files = fs.readdirSync(process.cwd());
            const pluridFiles = files.filter((file: string) => {
                const pluridRe = new RegExp(`${PLURID_EXTENSION}`);
                if (pluridRe.test(file)) { return file; }

                const pluridocRe = new RegExp(`${PLURIDOC_EXTENSION}`);
                if (pluridocRe.test(file)) { return file; }

                return false;
            });

            const pluridocApp = new PluridocApp([], '', pluridFiles);
            const pluridocAppHTML = pluridocApp.render();
            res.end(pluridocAppHTML);
            return;
        }

        try {
            if (fs.existsSync(requestedFilePath)) {
                const text = fs.readFileSync(requestedFilePath, 'utf8');
                const pluridocParser = new PluridocParser(text);
                const content = pluridocParser.getPlanesContent();
                const contentIDed = await checkAndSetContentIDs(content, requestedFilePath);

                const pluridocApp = new PluridocApp(contentIDed, requestedFile);
                const pluridocAppHTML = pluridocApp.render();
                res.end(pluridocAppHTML);
            }
        } catch(error) {
            // console.log(error);
            const pluridocApp = new PluridocApp([], '');
            const pluridocAppHTML = pluridocApp.render();
            res.end(pluridocAppHTML);
        }
    }

    private handleConnections () {
        this.io.on('connection', (socket: any) => {
            socket.on(IO_CONNECTIONS.FILE_WRITE, (message: IOMessageFileWrite) => {
                const {
                    content,
                    filename,
                    pluridPlaneID,
                } = message;

                const contentParsed = JSON.parse(content);
                const { nodes } = contentParsed.document;
                const lines: string[] = [];
                nodes.map((node: any) => {
                    if (node.type === 'paragraph') {
                        lines.push(node.nodes[0].text);
                    }
                });

                const contentString = lines.join('\n');

                // read the file with filename,
                const activeFilepath = path.join(process.cwd(), filename);

                const text = fs.readFileSync(activeFilepath, 'utf8');

                const updatedText = updatePluridPlaneWithID(text, pluridPlaneID, contentString);

                fs.writeFileSync(activeFilepath, updatedText);

                // console.log(contentString);
                // console.log(text);
                // console.log(content);
                // console.log(contentParsed);
                // console.log(lines);
                // console.log(filename);
                // console.log(pluridPlaneID);
            });

            socket.on(IO_CONNECTIONS.NEW_PLURID, async (filename: string) => {
                console.log('create new plurid', filename);
                await this.newPlurid(filename);
            });

            socket.on(IO_CONNECTIONS.NEW_PLURIDOC, async (filename: string) => {
                console.log('create new pluridoc', filename);
                await this.newPluridoc(filename);
            });
        });
    }
}


export default PluridocServer;
