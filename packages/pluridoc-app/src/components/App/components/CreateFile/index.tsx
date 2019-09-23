import React from 'react';

import {
    StyledCreateFile,
} from './styled';



interface CreateFileProperties {
    cancel: () => void;
}

const CreateFile: React.FC<CreateFileProperties> = (properties) => {
    const {
        cancel,
    } = properties;

    return (
        <StyledCreateFile>
            <div>
                <div>
                    filename
                </div>

                <input />
            </div>

            <div>
                <div>
                    filetype
                </div>

                <div>
                    <div>
                        .plurid
                    </div>
                    <div>
                        .pluridoc
                    </div>
                </div>
            </div>

            <div>
                <button
                    onClick={cancel}
                >
                    Cancel
                </button>
            </div>
        </StyledCreateFile>
    );
}


export default CreateFile;
