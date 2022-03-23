import styled from "styled-components";

export const OutsetHeadersCornerRadius = styled.div`
  position: relative;
  z-index: 15;
  &::after {
    content: "";
    position: absolute;
    bottom: -10.2px;
    height: 10px;
    width: 10px;
    border-left: 1px solid;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.systemMenu.border};
    border-top-left-radius: 10px;
    box-shadow: -4px -3px 0 2px var(--navs-bg);
    z-index: 20;
    pointer-events: none;
    display: none;
  }

  @media (min-width: 766px) {
    position: sticky;
    top: var(--top-bar-height);

    &::after {
      display: block;
    }
  }
`;
