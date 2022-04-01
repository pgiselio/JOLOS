import styled from "styled-components";

export const ProfilePageStyle = styled.section`
  .user-info .profile-pic {
    width: 50px;
    height: 50px;
  }
  .profile-page-header {
    display: flex;
    padding: 20px 15px;
    z-index: 5;
    background: var(--secondary-bg);
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  }

  .profile-page-header.sticky {
    position: sticky;
    top: 0;
  }

  .profile-page-header-container {
    display: grid;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
  .user-info {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-actions {
    display: flex;
    margin-top: 15px;
    width: 100%;
    min-width: 169px;
  }

  .user-actions button {
    width: 100%;
  }

  @media (min-width: 766px) {
    .profile-page-header {
      padding: 35px 40px;
      padding-top: 125px;
    }
    .profile-page-header-container {
      grid-template-columns: 1fr auto;
      grid-template-rows: 1fr auto;
    }
    .user-actions {
      margin-top: 0;
    }
    .user-info .profile-pic {
      width: 80px;
      height: 80px;
    }
  }
`;
