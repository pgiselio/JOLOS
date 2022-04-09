import styled from "styled-components";

export const VagaCardStyle = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .vaga-data {
    display: flex;
    flex-direction: column;
    position: relative;
    /* box-shadow: 0 1px 2px rgb(0 0 0 / 10%); */
    background: var(--primary-bg);
    border: 1px solid var(--outline-color);
    border-radius: 10px;

    height: 100%;
    width: 100%;
  }

  .vaga-header {
    display: flex;
    flex-direction: column;
    padding: 20px;
    .photo-align {
      display: grid;
      align-items: flex-start;
      grid-template-columns: auto 1fr;
      gap: 10px;
      width: 100%;
    }
    .profile-pic {
      width: 35px;
      height: 35px;
    }
  }

  .vaga-titles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    word-break: break-word;
    gap: 3px;
    h3 {
      width: 100%;
      max-height: 40px;
      line-height: 20px;
      font-size: 16px;
      overflow: hidden;
    }
    h3::first-letter {
      text-transform: uppercase;
    }
    h3 a {
      color: var(--text-a);
    }
    .sub {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      font-size: 14.4px;
      a {
        font-weight: 500;
      }
      .vaga-date {
        color: var(--text-b);
      }
    }
  }

  .vaga-date::before {
    content: "";
    background: var(--text-b);
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }
  /*
  .vaga-city::before {
    content: "";
    background: #000;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  } */

  // See vaga-status on globalSysStyle

  .vaga-text {
    position: relative;
    padding: 0 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    p {
      position: relative;
      display: inline-block;
      word-wrap: break-word;
      overflow: hidden;
      max-height: 4.5em;
      line-height: 1.5em;
      text-align: justify;
    }
  }

  .card-pill {
    padding: 5px 7px;
    font-size: 12px;
    max-width: calc(100vw - 70px);
    span {
      white-space: initial;
    }
    &.status {
      background: #c91f1f;
      color: #fff;
      & i {
        color: #fff;
      }
      &.active {
        background: var(--accent-color);
      }
    }
  }
  .vagas-bottom {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-between;
    width: 100%;
    bottom: 0;
    padding: 20px;
    background: var(--secondary-bg);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 1px solid var(--outline-color);

    .vagas-candidatos {
      font-size: 14px;
      font-weight: 500;
      /* background: #f1f1f1; */
      background: var(--primary-bg);
      padding: 8px;
      border-radius: 5px;
      margin-right: 10px;
    }

    .vagas-candidatos i {
      color: var(--accent-color);
      padding: 0 5px;
    }

    .vagas-detalhes-btn {
      text-decoration: none;
      color: var(--accent-color);
      font-size: 15px;
      padding: 8px;
      font-weight: 500;
      transition: 0.1s linear;
      text-align: center;
    }

    .vagas-detalhes-btn:hover {
      color: var(--accent-color-active);
    }
  }
  @media (min-width: 766px) {
    .card-pill {
      padding: 6px 10px;
      font-size: 14px;
    }
    .vaga-header {
      display: flex;
      flex-direction: column;
      padding: 20px;
      .photo-align {
        display: grid;
        align-items: flex-start;
        grid-template-columns: auto 1fr;
        gap: 10px;
        width: 100%;
      }
      .profile-pic {
        width: 55px;
        height: 55px;
      }
    }
    .vaga-titles {
      h3 {
        margin-top: 2px;
        max-height: 50px;
        line-height: 25px;
        font-size: 18px;
      }
    }
  }
`;
