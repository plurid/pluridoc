import React from 'react';

import {
    StyledToolbar,
} from './styled';

import Editor from '../../components/Editor';

import {
    IO_CONNECTIONS,
} from '../../data/enumerations';

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
    const socket = io();

    const {
        filename,
        content,
    } = properties;

    const newPluridPlane = () => {
        socket.emit(IO_CONNECTIONS.NEW_PLURID_PLANE, filename);
    }

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
        <>
            <PluridApp
                pages={pages}
                configuration={appConfiguration}
            />

            <StyledToolbar>
                <button
                    onClick={newPluridPlane}
                >
                    New Plurid Plane
                </button>
            </StyledToolbar>
        </>
    );
}


export default File;
