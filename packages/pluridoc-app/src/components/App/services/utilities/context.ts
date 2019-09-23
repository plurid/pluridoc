import React from 'react';

import {
    IContext,
} from '../../data/interfaces';

import {
    defaultContext,
} from '../../data/defaults';



const Context = React.createContext<IContext>(defaultContext);


export default Context;
