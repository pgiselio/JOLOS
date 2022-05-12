import styled from "styled-components";

export const CadastroConcluidoStyle = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    animation: slide-up 0.5s ease;
    gap: 10px;
  }
  .circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--accent-color);
    border-radius: 50%;
    height: 120px;
    width: 120px;
    animation: zoom-in 0.5s cubic-bezier(0.01, 1.19, 0.7, 1.16);
    i{ 
        font-size: 50px;
        color: white;
        animation: clipPathVerified .5s linear;
    }
  }
  .message {
      max-width: 300px;
      color: var(--text-b);
      text-align: center;
      font-size: 14px;
    }
  @keyframes clipPathVerified {
      0% {
        clip-path: circle(10px at 2px 20%);
      }
      60% {
        clip-path: circle(50% at -7px 80%);
      }
      100%{
        clip-path: circle(100% at 30px 10%);
      }
  }
  @keyframes zoom-in{
    0%{
        opacity: 0;
        transform: scale(0);
    }
    100%{
        transform: scale(1);
        opacity: 1;
    }
  }
`;
