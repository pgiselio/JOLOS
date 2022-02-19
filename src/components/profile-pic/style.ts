import styled from "styled-components";

export const StyledProfilePic = styled.div`
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  .default-profile {
    display: flex;
    position: absolute;
    top: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .default-profile img {
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
  .img-perfil {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .pp-border {
    box-shadow: inset 0 0 0 1px rgb(221, 221, 221);
    border-radius: 50%;
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
`;