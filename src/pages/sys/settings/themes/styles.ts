import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    .theme-option{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid ${(props) => props.theme.colors.systemMenu.border};
        border-radius: 5px;
        .preview{
            display: flex;
            flex-direction: column;
        }
        .title{
            font-size: 16px;
        }
    }
`;