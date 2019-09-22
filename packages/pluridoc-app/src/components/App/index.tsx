import React from 'react';

import './index.css';

import Dashboard from './containers/Dashboard';
import File from './containers/File';

import {
    PluridocPlane,
} from '@plurid/pluridoc-parser';



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

    if (content.length === 0) {
        return (
            <Dashboard
                files={files}
            />
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
