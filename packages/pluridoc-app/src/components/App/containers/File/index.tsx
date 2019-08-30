import React from 'react';


// import PluridApp from '@plurid/plurid-react';
import Editor from '../../components/Editor';



interface FileOwnProperties {
    content: any;
}

const File: React.FC<FileOwnProperties> = (properties) => {
    const {
        content,
    } = properties;

    // process content into a PluridApp specific data structure
    // and pass it as prop

    return (
        <div>
            {/* <PluridApp
                content={content}
            /> */}

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
