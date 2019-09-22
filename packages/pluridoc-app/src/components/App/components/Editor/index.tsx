import React, {
    useState,
} from 'react';

import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import {
    IO_CONNECTIONS,
} from '../../../../data/enumerations';

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
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: content.text[i],
                    },
                ],
            };

            nodes.push(textNode);
        }

        const value = {
            document: {
                nodes,
            },
        };

        return value;
    }

    const initialValue: any = parseValueFromContent(content);

    const [value, setValue] = useState(Value.fromJSON({...initialValue}));

    const onChange = (props: any) => {
        const contentValue = JSON.stringify(props.value.toJSON());
        const fileWrite = {
            content: contentValue,
            filename,
            pluridPlaneID: content.metadata.id,
        };
        socket.emit(IO_CONNECTIONS.FILE_WRITE, fileWrite);
        setValue(props.value);
    }

    return (
        <div>
            <SlateEditor
                value={value}
                onChange={onChange}
            />
        </div>
    );
}


export default Editor;
