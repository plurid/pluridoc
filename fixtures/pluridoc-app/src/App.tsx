import React from 'react';

import { PluridocReactApp } from '@plurid/pluridoc-app';



const content: any[] = [];
const files: any[] = [];

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
