import styled from "styled-components";

export const VagaCardStyle = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  background: #fff;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e5e5e5;

  .vaga-data {
    position: relative;
    height: 100%;
    padding-bottom: 95px;
  }

  .vaga-header {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .vaga-titles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    word-break: break-word;
  }

  .vaga-titles h3 {
    width: 100%;
    margin-bottom: 2px;
  }

  .vaga-titles span {
    font-size: 14px;
    margin-right: 5px;
  }

  .vaga-city::before {
    content: "";
    background: #000;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }

  .vaga-date::before {
    content: "";
    background: #000;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }

  .vaga-status.enabled {
    color: green;
  }

  .vaga-status.disabled {
    color: #b3001e;
  }

  .vaga-text {
    position: relative;
    padding: 0 20px;
  }

  .vaga-text p{
    position: relative;
    display: inline-block;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 4.5em;
    line-height: 1.5em;
    text-align: justify;
  }

  .vagas-bottom {
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 20px;
    background: #f9f9f9;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 1px solid #ededed;
  }

  .vagas-candidatos {
    font-size: 14px;
    font-weight: 500;
    background: #f1f1f1;
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
`;
