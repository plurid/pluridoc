import React from 'react';



interface DashboardOwnProperties {
    files: any;
}

const Dashboard: React.FC<DashboardOwnProperties> = (properties) => {
    const {
        files,
    } = properties;

    return (
        <div>
            <div>
                open files
            </div>

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
        </div>
    );
}


export default Dashboard;
