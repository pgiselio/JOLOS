import styled from "styled-components";

export const StyledNotifications = styled.div`
  margin-top: 20px;

  .notification-cards {
    overflow: auto;
    border-radius: 10px;
    padding-right: 5px;
  }

  .notification-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 5px;
  }

  .notification-header .buttons button {
    background: ${"var(--secondary-bg)ef"};
    padding: 5px 15px;
    border: 1px solid var(--outline-color);
    border-right: none;
    float: left;
    cursor: pointer;
    color: var(--text-b);
  }

  .notification-header .buttons button.active {
    background: var(--primary-bg);
    color: var(--text-a);
  }

  .notification-header .buttons button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .notification-header .buttons button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid var(--outline-color);
  }

  .notification-header .buttons button:hover + button {
    border-left-color: rgb(172, 172, 172);
  }

  .notification-header .buttons button:hover {
    color: var(--text-a);
    border-color: rgb(172, 172, 172);
  }

  .notification-card {
    padding: 20px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    background-color: var(--primary-bg);
    margin-bottom: 1px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-right: 1px solid var(--outline-color);
    border-left: 1px solid var(--outline-color);

    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-top: 1px solid var(--outline-color);
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom: 1px solid var(--outline-color);
    }

    .message {
      position: relative;
      height: 100%;
      user-select: none;
      p {
        user-select: none;
        word-break: break-all;
        font-size: 15px;
        color: var(--text-b);
      }
    }
    .card-date {
      color: rgb(122, 122, 122);
      font-size: 13px;
      font-weight: 500;
      padding-top: 20px;
    }
    .card-options {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: 0.1s linear;
      .btn-markasread {
        border-radius: 100%;
        width: 35px;
        height: 35px;
        border: 1px solid ${(props) => props.theme.colors.outlineColor};
        background-color: ${(props) => props.theme.colors.primaryBg + "ef"};
        color: var(--text-b);
        cursor: pointer;
        :hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }
        &::before {
          content: "\f06e";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          -webkit-font-smoothing: antialiased;
          font-size: 13px;
        }
      }
    }
    &[data-read="true"] {
      .card-options {
        opacity: 1;
        .btn-markasread {
          pointer-events: none;
          border-color: transparent;
          background-color: transparent;
        }
      }
    }
    :hover {
      background-color: var(--secondary-bg);
      .card-options {
        opacity: 1;
      }
    }
  }
  .no-notifications {
    padding: 20px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    background-color: var(--primary-bg);
    border-radius: 10px;
    cursor: default;
    :hover {
      background-color: var(--primary-bg);
    }
  }
  @media (min-width: 766px) {
    .notification-cards::-webkit-scrollbar {
      width: 16px;
    }

    .notification-cards::-webkit-scrollbar-thumb {
      background-color: #a3a3a3d5;
      border-radius: 20px;
      -webkit-background-clip: content-box;
      background-clip: content-box;
      border: 6px solid transparent;
    }

    .notification-cards::-webkit-scrollbar-thumb:hover {
      background-color: #838383d5;
      border-width: 4px;
    }
    .notification-cards::-webkit-scrollbar-thumb:active {
      background-color: #707070d5;
      border-width: 4px;
    }
  }
`;
