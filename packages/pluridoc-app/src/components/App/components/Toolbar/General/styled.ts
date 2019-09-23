import styled from 'styled-components';



export const StyledToolbar = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    bottom: 0%;
    width: 30px;
    display: grid;
    place-content: center;
`;


export const StyledToolbarButtons: any = styled.div`
    background-color: ${(props: any) => {
        return props.theme.backgroundColorSecondary;
    }};
    box-shadow: ${(props: any) => {
        return props.theme.boxShadowUmbra;
    }};

    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr;
    border-radius: 22.5px;
    font-size: 12px;
    opacity: 1;
    width: 30px;
    height: auto;

    transition: opacity 300ms ease-in-out;
    z-index: 9999;
    user-select: none;
`;
