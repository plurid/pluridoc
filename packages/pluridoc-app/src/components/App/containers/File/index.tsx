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

    // console.log(pages);

    return (
        <div>
            <PluridApp
                pages={pages}
            />
        </div>
    );
}


export default File;
