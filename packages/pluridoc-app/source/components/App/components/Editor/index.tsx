import React, {
    useMemo,
    useState,
} from 'react';

import {
    createEditor,
    Text,
} from 'slate';
import {
    Slate,
    Editable,
    withReact,
} from 'slate-react';

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

    const editor = useMemo(() => withReact(createEditor()), []);

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

    const initialValue: any = parseValueFromContent(content);

    const [value, setValue] = useState(initialValue);

    const onChange = (props: any) => {
        const contentString = JSON.stringify(props.value.toJSON());
        const fileWrite: IOMessageFileWrite = {
            content: contentString,
            filename,
            pluridPlaneID: content.metadata.id || '',
        };
        socket.emit(IO_CONNECTIONS.FILE_WRITE, fileWrite);
        setValue(props.value);
    }

    return (
        <div>
            <Slate
                editor={editor}
                defaultValue={value}
            >
                <Editable
                    onChange={onChange}
                />
            </Slate>
        </div>
    );
}


export default Editor;