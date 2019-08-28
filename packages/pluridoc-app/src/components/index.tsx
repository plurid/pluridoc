import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



const pluridocApp = document.getElementById('pluridoc-app');

const content = (window as any).__PLURIDOC_CONTENT__;

ReactDOM.hydrate(<App content={content} />, pluridocApp);
