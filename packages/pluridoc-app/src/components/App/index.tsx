import React from 'react';

import './index.css';

import Editor from './components/Editor';

import Dashboard from './containers/Dashboard';



interface AppOwnProperties {
    content: any;
    files: any;
}

const App: React.FC<AppOwnProperties> = (properties) => {
    const {
        content,
        files,
    } = properties;

    console.log(content, files);

    if (!content) {
        return (
            <Dashboard
                files={files}
            />
        );
    } else {
        return (
            <div>
                {content && content.map((planeContent: any) => {
                    return (
                        <div
                            key={Math.random()*10000 + ''}
                            className="plurid-plane"
                        >
                            <Editor
                                content={planeContent}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}


export default App;
