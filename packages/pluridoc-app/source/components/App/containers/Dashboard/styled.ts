import styled from 'styled-components';



export const StyledDashboard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
    user-select: none;
`;


export const StyledDashboardFiles = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 200px;
    height: 400px;
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
        max-height: 300px;
        overflow: auto;
        box-shadow: 0 4px 4px 0px hsla(0, 0%, 10%, 0.8);
    }

    ul li {
        width: 300px;
        padding: 15px;
        font-size: 12px;
        height: 20px;
        display: flex;
        align-items: center;
    }

    ul a:nth-child(even) {
        background: hsl(220, 10%, 35%);
    }

    ul a:nth-child(odd) {
        background: hsl(220, 10%, 20%);
    }

    a {
        display: block;
        color: #ddd;
        text-decoration: none;
    }

    ul a:hover {
        color: white;
        background: hsl(220, 10%, 10%);
    }
`;


export const StyledDashboardCreate = styled.div`
    display: grid;
    align-items: center;
    width: 200px;
    margin: 0 auto;
`;


export const StyledFileCreationContainer = styled.div`
    display: grid;
    align-items: center;
    width: 400px;
    height: 400px;
    margin: 0 auto;
`;
