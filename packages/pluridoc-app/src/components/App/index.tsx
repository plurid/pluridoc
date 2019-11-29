import React from 'react';

import './index.css';

import Context from './services/utilities/context';

import Dashboard from './containers/Dashboard';
import File from './containers/File';

import {
    PluridocPlane,
} from '@plurid/pluridoc-parser';

import themes from '@plurid/plurid-themes';



interface AppOwnProperties {
    files: string[];
    filename: string;
    content: PluridocPlane[];
}

const App: React.FC<AppOwnProperties> = (properties) => {
    const {
        files,
        filename,
        content,
    } = properties;

    const context = {
        theme: themes.plurid,
    }

    if (content.length === 0) {
        return (
            <Context.Provider
                value={context}
            >
                <Dashboard
                    files={files}
                />
            </Context.Provider>
        );
    } else {
        return (
            <File
                filename={filename}
                content={content}
            />
        );
    }
}


export default App;
