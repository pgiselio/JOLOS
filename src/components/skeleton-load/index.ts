import styled from "styled-components";
type SkeletonType = {
  variant: "text" | "circle" | "square";
  height?: string;
  width?: string;
};
export const Skeleton = styled.span<SkeletonType>`
  display: block;
  background-color: rgba(000, 000, 000, 0.12);
  ${(props) => (props.height && "height: " + props.height + ";") || "height: auto;"}
  ${(props) => (props.width && " width: " + props.width+ ";")}
  margin-top: ${(props) => (props.variant === "square" && "8px") || "0px"};
  margin-bottom: 0;
  transform-origin: ${(props) =>
    (props.variant === "circle" && "55%") ||
    (props.variant === "text" && "0 55%") ||
    (props.variant === "square" && "0")};
  transform: scale(${(props) =>
    (props.variant === "circle" && "0.9") ||
    (props.variant === "text" && "1, 0.6") ||
    (props.variant === "square" && "1")});
  border-radius: ${(props) =>
    (props.variant === "circle" && "50%") ||
    (props.variant === "text" && "5px") ||
    (props.variant === "square" && "5px")};
  animation: 1.5s ease-in-out 0.5s infinite pulse-animation;

  @keyframes pulse-animation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;
