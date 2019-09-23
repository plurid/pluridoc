import React, {
    useContext,
    useState,
} from 'react';

import {
    StyledCreateFile,
    StyledFilename,
    StyledFilenameTitle,
    StyledFilenameInput,
    StyledFiletype,
    StyledCancelCreateButtons,
} from './styled';

import Styles from '../../services/styles';

import Context from '../../services/utilities/context';



interface CreateFileProperties {
    cancel: () => void;
}

const CreateFile: React.FC<CreateFileProperties> = (properties) => {
    const context = useContext(Context);

    const {
        theme,
    } = context;

    const {
        cancel,
    } = properties;

    const [filename, setFilename] = useState('');

    const [pluridFile, setPluridFile] = useState(true);

    return (
        <StyledCreateFile>
            <StyledFilename>
                <StyledFilenameTitle>
                    filename
                </StyledFilenameTitle>

                <StyledFilenameInput>
                    <div
                        style={{width: '100%'}}
                    >
                        <Styles.InputText
                            theme={theme}
                            value={filename}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilename(event.target.value)}
                        />
                    </div>

                    <div>
                        {pluridFile
                            ? (
                                <div>
                                    .plurid
                                </div>
                            ) : (
                                <div>
                                    .pluridoc
                                </div>
                            )
                        }
                    </div>
                </StyledFilenameInput>
            </StyledFilename>

            <StyledFiletype>
                <div>
                    filetype
                </div>

                <Styles.Switch>
                    <input
                        type="checkbox"
                        checked={pluridFile}
                        onChange={() => setPluridFile(plurid => !plurid)}
                    />
                    <span className="slider round" />
                </Styles.Switch>
            </StyledFiletype>

            <StyledCancelCreateButtons>
                <Styles.Button
                    onClick={cancel}
                >
                    Cancel
                </Styles.Button>

                <Styles.Button
                    onClick={cancel}
                >
                    Create File
                </Styles.Button>
            </StyledCancelCreateButtons>
        </StyledCreateFile>
    );
}


export default CreateFile;
