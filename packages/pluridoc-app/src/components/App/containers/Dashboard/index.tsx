import React from 'react';

import {
    StyledDashboard,
    StyledDashboardTitle,
    StyledDashboardList,
    StyledDashboardCreate,
} from './styled';

import PluridLogo from '../../assets/plurid-logo.png';



interface DashboardOwnProperties {
    files: any;
}

const Dashboard: React.FC<DashboardOwnProperties> = (properties) => {
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
                {files && (
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
                Create New File
            </StyledDashboardCreate>
        </StyledDashboard>
    );
}


export default Dashboard;
