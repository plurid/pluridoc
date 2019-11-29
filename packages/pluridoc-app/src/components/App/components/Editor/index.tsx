import React, {
    useMemo,
    useState,
} from 'react';

import {
    createEditor,
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

    // const [value, setValue] = useState(Value.fromJSON({...initialValue}));
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
