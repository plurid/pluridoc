import React from 'react';

import { PluridocReactApp } from '@plurid/pluridoc-app';



const content: any[] = [];
const files: any[] = [
    'a-file.plurid',
    'another-file.pluridoc',
    'a-file2.plurid',
    'another-file2.pluridoc',
    'a-file3.plurid',
    'another-file3.pluridoc',
    // 'a-file4.plurid',
    // 'another-file4.pluridoc',
    // 'a-file5.plurid',
    // 'another-file5.pluridoc',
    // 'a-file6.plurid',
    // 'another-file6.pluridoc',
    // 'a-file7.plurid',
    // 'another-file7.pluridoc',
    // 'a-file8.plurid',
    // 'another-file8.pluridoc',
];

const App: React.FC = () => {
    return (
        <div>
            <PluridocReactApp
                content={content}
                files={files}
            />
        </div>
    );
}


export default App;
