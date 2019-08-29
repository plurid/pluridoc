import React from 'react';

import './index.css';

import Dashboard from './containers/Dashboard';
import File from './containers/File';



interface AppOwnProperties {
    content: any;
    files: any;
}

const App: React.FC<AppOwnProperties> = (properties) => {
    const {
        content,
        files,
    } = properties;

    if (content === []) {
        return (
            <Dashboard
                files={files}
            />
        );
    } else {
        return (
            <File
                content={content}
            />
        );
    }
}


export default App;
