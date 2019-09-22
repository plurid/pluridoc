import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



const files = (window as any).__PLURIDOC_FILES__;
const filename = (window as any).__PLURIDOC_FILENAME__;
const content = (window as any).__PLURIDOC_CONTENT__;

const pluridocApp = document.getElementById('pluridoc-app');

ReactDOM.render(
    <App
        files={files}
        filename={filename}
        content={content}
    />,
    pluridocApp
);
