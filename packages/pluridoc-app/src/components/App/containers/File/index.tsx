import React from 'react';

import Editor from '../../components/Editor';



interface FileOwnProperties {
    content: any;
}

const File: React.FC<FileOwnProperties> = (properties) => {
    const {
        content,
    } = properties;

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


export default File;
