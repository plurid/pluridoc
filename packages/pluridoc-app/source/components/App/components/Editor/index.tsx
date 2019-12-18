import React, {
    useMemo,
    useState,
} from 'react';

import Chisel, {
    ChiselValue,
} from '@plurid/chisel-react';

import {
    IO_CONNECTIONS,
} from '../../data/enumerations';

import {
    IOMessageFileWrite,
} from '../../../../data/interfaces';

import {
    PluridocPlane,
} from '@plurid/pluridoc-parser';



interface EditorProperties {
    filename: string;
    content: PluridocPlane;
}


const Editor: React.FC<EditorProperties> = (properties) => {
    const socket = io();

    const {
        filename,
        content,
    } = properties;

    const parseValueFromContent = (content: any) => {
        const nodes: any[] = [];

        for (let i = 0; i < content.text.length; i++) {
            const textNode = {
                type: 'paragraph',
                children: [
                    {
                        text: content.text[i],
                        marks: [],
                    },
                ],
            };

            nodes.push(textNode);
        }

        return nodes;
    }

    const initialValue: ChiselValue = {
        nodes: [],
    };

    // const initialValue: any = parseValueFromContent(content);

    const [value, setValue] = useState(initialValue);

    const onChange = (
        event: any,
        value: any,
    ) => {
        // const contentString = JSON.stringify(value);
        // const fileWrite: IOMessageFileWrite = {
        //     content: contentString,
        //     filename,
        //     pluridPlaneID: content.metadata.id || '',
        // };
        // socket.emit(IO_CONNECTIONS.FILE_WRITE, fileWrite);
        setValue(value);
    }

    return (
        <Chisel
            value={value}
            atChange={onChange}
        />
    );
}


export default Editor;
