import React from 'react';



interface DashboardOwnProperties {
    files: any;
}

const Dashboard: React.FC<DashboardOwnProperties> = (properties) => {
    const {
        files,
    } = properties;

    console.log(files);

    return (
        <div>
            open files
        </div>
    );
}


export default Dashboard;
