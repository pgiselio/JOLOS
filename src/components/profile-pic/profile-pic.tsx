import { CSSProperties } from "react";
import { css } from "styled-components";
import { StyledProfilePic } from "./style";

type ProfilePicType = {
  url?: string;
  style?: CSSProperties;
  className?: string;
};
export function ProfilePic(props: ProfilePicType) {
  return (
    <StyledProfilePic
      className={"profile-pic " + (props.className ?? "")}
      style={props.style}
    >
      <span className="default-profile">
        <svg
          id="defaultProfilePicSVG"
          data-name="defaultProfilePicSVG"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 574 574"
        >
          <defs>
            <style>
              {css`
                .cls-1 {
                  fill: #555d60;
                }
                .cls-2 {
                  fill: #c3c7c9;
                }
              `}
            </style>
          </defs>
          <g>
            <circle className="cls-1" cx="287" cy="287" r="287" />
            <path
              className="cls-2"
              d="M650.47,250.34A104.37,104.37,0,1,1,546.11,354.7,104.36,104.36,0,0,1,650.47,250.34ZM650,666a267.09,267.09,0,0,0,186-75.07c-40.23-53-108.58-87.9-186.14-87.9s-145.78,34.82-186,87.74A267.09,267.09,0,0,0,650,666Z"
              transform="translate(-363 -111)"
            />
          </g>
        </svg>
      </span>

      {props.url && (
        <>
          <img className="img-perfil" src={props.url} alt="" />
          <span className="pp-border"></span>
        </>
      )}
    </StyledProfilePic>
  );
}
