import styled from 'styled-components';



export const StyledButton = styled.button`
    font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: block;
    color: white;
    width: 100%;
    border: none;
    outline: none;
    user-select: none;
    cursor: pointer;
    display: grid;
    place-content: center;
    border-radius: 22.5px;
    font-size: 13px;
    height: 45px;
    background-color: hsl(220, 10%, 20%);
    box-shadow: 0px 10px 10px 0px hsla(220, 10%, 5%, 0.5);
    transition: box-shadow 200ms linear;

    :hover {
        background-color: hsl(220, 10%, 10%);
    }

    :active {
        box-shadow: 0px 3px 3px 0px hsla(220, 10%, 5%, 0.5);
    }
`;

export const StyledLinkButton = styled.button`
    display: block;
    color: white;
    width: 100%;
    border: none;
    outline: none;
    user-select: none;
    cursor: pointer;
    display: grid;
    place-content: center;
    font-size: 15px;
    font-weight: bold;
    background: transparent;
`;
