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
    background: #f7f7f7;
    padding: 5px 15px;
    border: 1px solid rgb(221, 221, 221);
    border-right: none;
    float: left;
    cursor: pointer;
    color: #666;
  }

  .notification-header .buttons button.active {
    background: #fff;
  }

  .notification-header .buttons button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .notification-header .buttons button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid rgb(221, 221, 221);
  }

  .notification-header .buttons button:hover + button {
    border-left-color: rgb(172, 172, 172);
  }

  .notification-header .buttons button:hover {
    color: #333;
    border-color: rgb(172, 172, 172);
  }

  .notification-card {
    padding: 20px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    background-color: #fff;
    margin-bottom: 1px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    border-right: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
  }

  .notification-card:hover {
    background-color: #f5f6f7;
  }

  .notification-card:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-top: 1px solid #e3e3e3;
  }

  .notification-card:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom: 1px solid #e3e3e3;
  }

  .notification-card .card-date {
    color: rgb(122, 122, 122);
    font-size: 13px;
    font-weight: 500;
    padding-top: 20px;
  }

  .notification-card .card-data {
    position: relative;
    height: 100%;
  }

  .notification-card .card-data p {
    word-break: break-all;
    font-size: 15px;
    color: #444;
  }

  .notification-card .card-options {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
  }

  .notification-card:hover .card-options {
    opacity: 1;
    transition: 0.1s linear;
  }

  .notification-card .card-options .btn-markasread {
    border-radius: 100%;
    width: 35px;
    height: 35px;
    border: 2px solid #ccc;
    background: #f1f1f1ef;
    color: #666;
    cursor: pointer;
  }

  .notification-card .card-options .btn-markasread:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .notification-card .card-options .btn-markasread::before {
    content: "\f06e";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    font-size: 13px;
  }
`;