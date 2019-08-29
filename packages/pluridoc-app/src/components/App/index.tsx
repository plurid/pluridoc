import React from 'react';

// import './styles.css';

import Editor from './components/Editor';



interface AppOwnProperties {
    content: any;
}

const App: React.FC<AppOwnProperties> = (properties) => {
    const {
        content,
    } = properties;

    return (
        <div>
            {content.map((planeContent: any) => {
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


export default App;
