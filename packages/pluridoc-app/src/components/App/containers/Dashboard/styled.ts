import styled from 'styled-components';



export const StyledDashboard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr 200px;
    user-select: none;
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
    place-content: center;
`;


export const StyledFileCreationContainer = styled.div`
    background: hsl(220, 10%, 20%);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: grid;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 100%;
`;
