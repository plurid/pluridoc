import React, {
    useState,
} from 'react';

import {
    StyledToolbar,
    StyledToolbarButtons,
} from './styled';

import ToolbarButton from '../Button';

import { Theme } from '@plurid/apps.utilities.themes';



interface ToolbarProperties {
    theme: Theme;
    newPluridPlane: () => void;
}

const Toolbar: React.FC<ToolbarProperties> = (properties) => {
    const [mouseIn, setMouseIn] = useState(false);

    const {
        theme,
    } = properties;

    return (
        <StyledToolbar
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}
        >
            <StyledToolbarButtons
                theme={theme}
            >

            </StyledToolbarButtons>
        </StyledToolbar>
    );
}


export default Toolbar;
