import styled from "styled-components";

interface TabsMenuProps {
  isOnTop?: boolean;
}

export const TabsMenuStyle = styled.div<TabsMenuProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: sticky;
  z-index: 10;
  top: var(--top-bar-height);

  .spacer {
    background: var(--bg-body);
    display: none;
  }

  .tabs-menu-container {
    display: flex;
    padding: 0 10px;
    border-radius: 5px;
    width: 100%;
    height: 65px;
    align-items: center;
    background: var(--navs-bg);
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  }

  ul {
    display: flex;
    list-style: none;
    height: 100%;
    column-gap: 5px;
    overflow: hidden;
    white-space: nowrap;
  }
  @media (min-width: 766px) {
    z-index: ${(props) => (props.isOnTop ? "10" : "4")};

    &.ontop {
      z-index: 10;
    }

    .spacer {
      display: block;
      height: 20px;
    }

    .tabs-menu-container {
      margin: ${(props) => (props.isOnTop ? "0" : "0 30px")};
      border-radius: ${(props) => (props.isOnTop ? "0" : "5px")};
    }

    &.ontop .tabs-menu-container {
      margin: 0;
      border-radius: 0;
    }
  }
`;

export const TabsMenuItemStyle = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  a {
    display: flex;
    align-items: center ;
    padding: 8px 15px;
    border-radius: 8px;
    text-decoration: none;
    border: 2px solid transparent;
    position: relative;
    height: 100%;
    color: var(--text-a);
    transition: font .2s ease-in;
  }
  a::after {
    content: " ";
    width: 100%;
    height: 0;
    background-color: var(--accent-color);
    position: absolute;
    bottom: -2px;
    left: 0;
    transition: height .2s ease-in ;
  }
  a span {
    padding: 2px 6px;
    background: var(--primary-bg);
    color: var(--accent-color);
    border-radius: 5px;
    font-weight: 500;
    margin-left: 5px;
  }
  a.active {
    /* background: #f7f7f7; */
    color: var(--accent-color);
    font-weight: 600;
  }
  a.active::after {
    height: 2px;
  }
  a.active span {
    background: var(--accent-color);
    color: #fff;
  }
  a:hover{
      background-color: var(--primary-bg);
  }
`;
