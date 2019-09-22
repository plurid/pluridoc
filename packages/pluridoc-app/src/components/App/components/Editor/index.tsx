import React, {
    useState,
} from 'react';

import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import {
    IO_CONNECTIONS,
} from '../../../../data/enumerations';



const Editor: React.FC<any> = (properties) => {
    const socket = io();

    const {
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
        const content = JSON.stringify(props.value.toJSON());
        socket.emit(IO_CONNECTIONS.FILE_WRITE, content);
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
