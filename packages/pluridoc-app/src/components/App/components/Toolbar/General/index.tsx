import React, {
    useState,
} from 'react';

import {
    StyledToolbar,
    StyledToolbarButtons,
} from './styled';

import ToolbarButton from '../Button';

import AddIcon from '../../../assets/add-icon';

import { Theme } from '@plurid/apps.utilities.themes';



interface ToolbarProperties {
    theme: Theme;
    newPluridPlane: () => void;
}

const Toolbar: React.FC<ToolbarProperties> = (properties) => {
    const [mouseIn, setMouseIn] = useState(false);

    const {
        theme,
        newPluridPlane,
    } = properties;

    return (
        <StyledToolbar
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}
        >
            <StyledToolbarButtons
                theme={theme}
            >
                <ToolbarButton
                    atClick={newPluridPlane}
                    image={AddIcon}
                    scaleImage={true}
                    text="new plurid plane"
                    textLeft={true}
                    showText={true}
                    first={true}
                    last={true}
                    active={false}
                    theme={theme}
                />
            </StyledToolbarButtons>
        </StyledToolbar>
    );
}


export default Toolbar;
