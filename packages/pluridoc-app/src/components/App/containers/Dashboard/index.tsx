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
                        return (
                            <li
                                key={file}
                            >
                                {file}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}


export default Dashboard;
