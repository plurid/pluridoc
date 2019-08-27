import React from 'react';
import ReactDOM from 'react-dom/server';

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
        const appHTML = ReactDOM.renderToString(<App content={this.content} />);
        const title = this.filename.slice(1,);
        return `
            <html>
                <head>
                    <title>${title}</title>
                </head>
                <body>
                    <div>
                        ${appHTML}
                    </div>
                </body>
            </html>
        `;
    }
}


export default PluridocApp;
