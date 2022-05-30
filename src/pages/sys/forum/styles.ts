import styled from "styled-components";

export const Container = styled.section`
  .topics {
    padding: 20px;
    padding-top: 10px;
  }
  .topic {
    & ~ .topic {
      margin-top: 15 px;
      border-top: 1px solid var(--outline-color);
    }
    a {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 5px;
      color: var(--text-a);
    }
  }

  .vaga-forum-info {
    h3 {
      font-size: 14px;
      span.topicID {
        font-size: 12px;
        color: var(--text-b);
        font-weight: normal;
      }
    }
    .topic-meta {
      display: flex;
      gap: 5px;
      font-size: 13px;
      color: var(--text-b);
    }
  }
  .last-answer {
    display: flex;
    i {
      color: var(--accent-color);
      transform-origin: center;
      transform: rotate(90deg);
      height: 20px;
      width: 20px;
      min-width: 20px;
      margin-top: 5px;
    }
    .answer-content {
      display: flex;
      margin-left: 5px;
      padding: 10px;
      border-radius: 5px;
      background-color: #81818111;

      .candidato-pic {
        width: 20px;
        min-width: 20px;
        height: 20px;
      }
      .pessoa-forum-info {
        display: flex;
        flex-direction: column;
        margin-left: 5px;

        .name {
          font-size: 12px;
          color: var(--text-a);
        }
        .message {
          color: var(--text-b);
          font-size: 13px;
          line-height: 15px;
          max-height: 30px;
          overflow: hidden;
        }
      }
    }
  }
`;
