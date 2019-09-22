import React from 'react';

import Editor from '../../components/Editor';

import PluridApp, {
    PluridPage,
    PluridConfiguration,
} from '@plurid/plurid-react';

import {
    PluridocPlane,
} from '@plurid/pluridoc-parser';



interface FileOwnProperties {
    filename: string;
    content: PluridocPlane[];
}

const File: React.FC<FileOwnProperties> = (properties) => {
    const {
        filename,
        content,
    } = properties;

    const pages: PluridPage[] = [];
    for (let planeContent of content) {
        const page = {
            path: '/' + planeContent.metadata.id,
            component: {
                element: () => (
                    <Editor
                        content={planeContent}
                        filename={filename}
                    />
                ),
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
        <PluridApp
            pages={pages}
            configuration={appConfiguration}
        />
    );
}


export default File;
