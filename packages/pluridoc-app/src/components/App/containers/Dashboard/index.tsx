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

import PluridLogo from '../../assets/plurid-logo.png';



interface DashboardOwnProperties {
    files: any;
}

const Dashboard: React.FC<DashboardOwnProperties> = (properties) => {
    const [showFileCreation, setShowFileCreation] = useState(false);

    const {
        files,
    } = properties;

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
                <button
                    onClick={() => setShowFileCreation(true)}
                >
                    Create a New File
                </button>
            </StyledDashboardCreate>

            {showFileCreation && (
                <StyledFileCreationContainer>
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
                        <button>
                            Create
                        </button>

                        <button>
                            Cancel
                        </button>
                    </div>
                </StyledFileCreationContainer>
            )}
        </StyledDashboard>
    );
}


export default Dashboard;
