import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../components/App';

import {
    IPluridocApp,
} from '../../interfaces';




class PluridocApp implements IPluridocApp {
    private content: any;
    private filename: string;

    constructor(content: any, filename: string) {
        this.content = content;
        this.filename = filename;
    }

    render () {
        const appHTML = ReactDOMServer.renderToString(<App content={this.content} />);
        const title = this.filename.slice(1,);

        const clientScriptPath = path.join(__dirname, '../src/client/main.js');
        const clientScript = fs.readFileSync(clientScriptPath, 'utf8');

        // compile the client-side application as a javascript file and import it into the html template

        return `
            <html>
                <head>
                    <title>${title}</title>
                    <!-- injected pluridoc-app scripts -->
                    <script>
                        console.log('works');
                    </script>
                </head>
                <body>
                    <div id="pluridoc-app">${appHTML}</div>
                    <script>
                        ${clientScript}
                    </script>
                </body>
            </html>
        `;
    }
}


export default PluridocApp;
