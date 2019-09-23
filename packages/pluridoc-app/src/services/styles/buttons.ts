import styled from 'styled-components';



export const StyledButton = styled.button`
    display: block;
    color: white;
    width: 100%;
    border: none;
    outline: none;
    user-select: none;
    cursor: pointer;
    display: grid;
    place-content: center;
    border-radius: 50px;
    font-size: 15px;
    font-weight: bold;
    height: 50px;
    background-color: hsl(247, 19%, 29%);
    box-shadow: 0px 10px 10px 0px hsla(220, 40%, 5%, 0.5);
    transition: box-shadow 200ms linear;

    :hover {
        background-color: hsl(247, 19%, 39%);
    }

    :active {
        box-shadow: 0px 3px 3px 0px hsla(220, 40%, 5%, 0.5);
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
