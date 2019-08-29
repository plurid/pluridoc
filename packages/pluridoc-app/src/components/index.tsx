import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



const content = (window as any).__PLURIDOC_CONTENT__;
const files = (window as any).__PLURIDOC_FILES__;

const pluridocApp = document.getElementById('pluridoc-app');

ReactDOM.render(
    <App
        content={content}
        files={files}
    />,
    pluridocApp
);
