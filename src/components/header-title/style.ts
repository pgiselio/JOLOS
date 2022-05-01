import styled from "styled-components";

export const HeaderTitleStyle = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  justify-content: center;
  margin-top: 5px;
  /*border-bottom: 1px solid var(--outline-color);*/
  z-index: 10;
  /* border-bottom: 1px solid ${(props) =>
    props.theme.colors.systemMenu.border}; */
  top: var(--top-bar-height);

  h2 {
    color: var(--accent-color);
    font-size: 16px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
  }
  @media (min-width: 766px) {
    position: sticky;
    margin-top: 0;
    background: var(--navs-bg-opacity);
    box-shadow: 0px 1px 4px rgb(0 0 0 / 8%);
    border-bottom: 1px solid ${(props) => props.theme.colors.systemMenu.border};

    .header-section {
      height: 80px;
    }

    .header-section h2 {
      font-size: 20px;
    }
  }
`;
