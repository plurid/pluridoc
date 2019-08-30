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
                        {files.map((file: string) => {
                            const link = `/${file}`;

                            return (
                                <li
                                    key={file}
                                >
                                    <a href={link}>
                                        {file}
                                    </a>
                                </li>
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
