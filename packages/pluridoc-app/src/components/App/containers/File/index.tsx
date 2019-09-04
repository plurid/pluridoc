import React from 'react';


import PluridApp from '@plurid/plurid-react';
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
    const pages: any[] = [];
    for (let planeContent of content) {
        const page = {
            path: Math.random()*10000 + '',
            component: {
                element: () => (<Editor content={planeContent} />)
            },
            root: true,
        }
        pages.push(page);
    }

    console.log(pages);

    return (
        <div>
            <PluridApp
                pages={pages}
            />

            {/* {content && content.map((planeContent: any) => {
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
            })} */}
        </div>
    );
}


export default File;
