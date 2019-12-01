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

import {
    IO_CONNECTIONS,
} from '../../data/enumerations';



interface CreateFileProperties {
    cancel: () => void;
}

const CreateFile: React.FC<CreateFileProperties> = (properties) => {
    const socket = io();

    const context = useContext(Context);

    const {
        theme,
    } = context;

    const {
        cancel,
    } = properties;

    const [filename, setFilename] = useState('');

    const [pluridFile, setPluridFile] = useState(true);

    const createFile = () => {
        if (filename) {
            if (pluridFile) {
                socket.emit(IO_CONNECTIONS.NEW_PLURID, filename);
            } else {
                socket.emit(IO_CONNECTIONS.NEW_PLURIDOC, filename);
            }
        }
    }

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
                            spellCheck={false}
                            autoCapitalize="false"
                            autoComplete="false"
                            autoCorrect="false"
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

                <Styles.Switch
                    theme={theme}
                >
                    <input
                        type="checkbox"
                        checked={pluridFile}
                        onChange={() => setPluridFile(plurid => !plurid)}
                    />
                    <span className="slider round" />
                </Styles.Switch>
            </StyledFiletype>

            <StyledCancelCreateButtons>
                <Styles.LinkButton
                    onClick={cancel}
                >
                    Cancel
                </Styles.LinkButton>

                <Styles.Button
                    onClick={createFile}
                >
                    Create File
                </Styles.Button>
            </StyledCancelCreateButtons>
        </StyledCreateFile>
    );
}


export default CreateFile;
