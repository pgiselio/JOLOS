import styled from "styled-components";

export const VagaPageStyle = styled.section`
  .vaga-page-header-container {
    padding: 0;
  }
  .vaga-page-header {
    padding: 5px 20px;
    padding-top: 40px;
    position: relative;
    background-color: var(--navs-bg);
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    .profile-pic {
      width: 50px;
      height: 50px;
    }
    h2 {
      padding-top: 10px;
      color: var(--text-a);
      font-weight: 500;
      font-size: 20px;
    }

    .subscribe {
      display: flex;
      align-items: end;
      flex-direction: column;

      flex-wrap: wrap;
      gap: 10px;
      justify-content: end;
      .vaga-status {
        color: #b3001e;
        font-weight: 500;
        font-size: 14px;
        padding: 9px 0;
      }
      .vaga-status.enabled {
        color: green;
      }
    }
  }
  .tabs {
    padding: 0;
    overflow: hidden;
    max-width: 100vw;
  }
  .vaga-page-info {
    display: flex;
    margin-top: 10px;
    width: 100%;
  }
  .vaga-page-description {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    white-space: pre-wrap;
  }
  .vaga-page-description ul,
  ol {
    margin-block-start: 15px;
    margin-block-end: 15px;
    padding-left: 18px;
  }

  .vaga-page-description ul li,
  ol li {
    margin-left: 16px;
  }
  @media (min-width: 766px) {
    .vaga-page-header {
      padding: 0 40px;
      padding-top: 50px;
      .profile-pic {
        width: 60px;
        height: 60px;
      }
      h2 {
        font-size: 22px;
      }
      .subscribe {
        flex-direction: row;
        align-items: center;

        .vaga-status {
        }
        .vaga-status.enabled {
        }
      }
    }
    .tabs {
      padding: 0 30px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      max-width: 1280px;
    }
  }
`;
