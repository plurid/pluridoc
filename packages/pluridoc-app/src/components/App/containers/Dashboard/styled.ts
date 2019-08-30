import styled from 'styled-components';



export const StyledDashboard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr 200px;
`;


export const StyledDashboardTitle = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    place-content: center;
    justify-items: center;
    align-items: center;
`;


export const StyledDashboardList = styled.div`
    display: grid;
    place-content: center;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul li {
        width: 300px;
        padding: 15px;
        font-size: 12px;
    }

    ul li:nth-child(even) {
        background: hsl(220, 10%, 35%);
    }

    ul li:nth-child(odd) {
        background: hsl(220, 10%, 20%);
    }

    a {
        color: #ddd;
        text-decoration: none;
    }

    a:hover {
        color: white;
    }
`;


export const StyledDashboardCreate = styled.div`
    display: grid;
    place-content: center;
`;
