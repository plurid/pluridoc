import React, {
    useState,
} from 'react';

import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';



const Editor: React.FC<any> = (properties) => {
    // const socket = io();

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
        // const jsonValue = JSON.stringify(value.toJSON());
        // console.log(content);
        // console.log(jsonValue);
        // console.log('---');
        // socket.emit('writing', content);
        setValue(props.value);
    }

    return (
        <div>
            <SlateEditor value={value} onChange={onChange} />
        </div>
    );
}


export default Editor;
