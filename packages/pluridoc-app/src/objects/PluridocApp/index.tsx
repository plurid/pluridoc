import fs from 'fs';
import path from 'path';

import {
    IPluridocApp,
} from '../../interfaces';




class PluridocApp implements IPluridocApp {
    private content: any[];
    private filename: string;
    private files: string[];

    constructor(content: any[] = [], filename: string = '', files: string[] = []) {
        this.content = content;
        this.filename = filename;
        this.files = files;
    }

    render () {
        const title = this.filename.slice(1,) || 'pluridoc';

        const clientScriptPath = path.join(__dirname, '../src/client/script.js');
        const clientScript = fs.readFileSync(clientScriptPath, 'utf8');

        return `
            <html>
                <head>
                    <title>${title}</title>
                    <script>
                        window.__PLURIDOC_CONTENT__ = ${JSON.stringify(this.content)}
                        window.__PLURIDOC_FILES__ = ${JSON.stringify(this.files)}
                    </script>
                    <script src="/socket.io/socket.io.js"></script>
                </head>
                <body>
                    <div id="pluridoc-app"></div>
                    <script>
                        ${clientScript}
                    </script>
                </body>
            </html>
        `;
    }
}


export default PluridocApp;
