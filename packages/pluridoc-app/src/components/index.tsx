import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



const pluridocApp = document.getElementById('pluridoc-app');

ReactDOM.hydrate(<App content={{}} />, pluridocApp);
