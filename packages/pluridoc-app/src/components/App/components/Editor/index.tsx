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
        console.log('value use effect', value);
        setValue(Value.fromJSON(value));
    }, [content]);

    const parseValueFromContent = (content: any) => {
        const nodes: any[] = [];

        for (const contentItem of content.entries()) {
            console.log('contentItem', contentItem);

            for (const text of contentItem.text.entries()) {
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

    const onChange = ({ value }: any) => {
        const content = JSON.stringify(value.toJSON())
        localStorage.setItem('content', content)

        console.log('new value', value);
        setValue(value);
    }

    return (
        <div>
            <SlateEditor value={value} onChange={onChange} />
        </div>
    );
}


export default Editor;
