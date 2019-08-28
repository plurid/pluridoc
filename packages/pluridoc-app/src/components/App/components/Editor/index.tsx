import React, {
    useState,
    useEffect,
} from 'react';

import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';



const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: '',
                    },
                ],
            },
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: 'plane content',
                    },
                ],
            },
        ],
    },
});


const Editor: React.FC<any> = (properties) => {
    const [value, setValue] = useState(initialValue);

    const {
        content,
    } = properties;

    useEffect(() => {
        const value: any = parseValueFromContent(content);
        console.log('aaa', value);
        setValue(value);
    }, [content]);

    const parseValueFromContent = (content: any) => {
        const nodes: any[] = [];

        for (const contentItem of content.entries()) {
            console.log(contentItem);

            for (const text of contentItem.text.entries()) {
                console.log(TextEncoderStream);
                const textNode = {
                    object: 'block',
                    type: 'paragraph',
                    nodes: [
                        {
                            object: 'text',
                            text,
                        },
                    ],
                };

                nodes.push(textNode);
            }
        }

        const value = {
            document: {
                nodes: {
                    object: 'block',
                    type: 'paragraph',
                    nodes,
                },
            },
        };

        console.log('value', value);

        return value;
    }

    // const initialValue: any = parseValueFromContent(content);
    // const [value, setValue] = useState(Value.fromJSON(initialValue));


    const onChange = ({ value }: any) => {
        const content = JSON.stringify(value.toJSON())
        localStorage.setItem('content', content)

        console.log('value new', value);

        setValue(value);
    }

    return (
        <div>
            <SlateEditor value={value} onChange={onChange} />
        </div>
    );
}


export default Editor;
