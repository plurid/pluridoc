import React, {
    useState,
} from 'react';

import {
    StyledDashboard,
    StyledDashboardTitle,
    StyledDashboardList,
    StyledDashboardCreate,
    StyledFileCreationContainer,
} from './styled';

import Styles from '../../services/styles';

import PluridLogo from '../../assets/plurid-logo.png';

import CreateFile from '../../components/CreateFile';



interface DashboardOwnProperties {
    files: any;
}

const Dashboard: React.FC<DashboardOwnProperties> = (properties) => {
    const [showFileCreation, setShowFileCreation] = useState(false);

    const {
        files,
    } = properties;

    const createFile = () => {
        console.log('create new plurid file');
    }

    return (
        <StyledDashboard>
            <StyledDashboardTitle>
                <img src={PluridLogo} alt="plurid logo" height={50} />
                <h1>
                    pluridoc
                </h1>
            </StyledDashboardTitle>

            <StyledDashboardList>
                {files.length > 0 && (
                    <ul>
                        <li
                            style={{
                                backgroundColor: 'hsl(220, 10%, 15%)',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            files
                        </li>
                        {files.map((file: string) => {
                            const link = `/${file}`;

                            return (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={file}
                                >
                                    <li>
                                            {file}
                                    </li>
                                </a>
                            )
                        })}
                    </ul>
                )}
            </StyledDashboardList>

            <StyledDashboardCreate>
                <Styles.Button
                    onClick={() => {
                        showFileCreation ? createFile() : setShowFileCreation(true);
                    }}
                >
                    Create a New File
                </Styles.Button>
            </StyledDashboardCreate>

            {showFileCreation && (
                <StyledFileCreationContainer>
                    <CreateFile
                        cancel={() => setShowFileCreation(false)}
                    />
                </StyledFileCreationContainer>
            )}
        </StyledDashboard>
    );
}


export default Dashboard;
