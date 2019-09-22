import React from 'react';

import Editor from '../../components/Editor';

import PluridApp, {
    PluridConfiguration,
} from '@plurid/plurid-react';



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

    const appConfiguration: Partial<PluridConfiguration> = {
        space: {
            layout: {
                type: 'COLUMNS',
            }
        },
        planeWidth: 1,
    };

    return (
        <div>
            <PluridApp
                pages={pages}
                configuration={appConfiguration}
            />
        </div>
    );
}


export default File;
