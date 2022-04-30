import styled from "styled-components";

interface CircularProgressProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  duration?: string;
}

export default function CircularProgressFluent({
  className = "",
  color = "#1d8c37",
  width = "50px",
  height = width,
  style,
  duration = "1s",
  ...rest
}: CircularProgressProps & React.SVGProps<SVGSVGElement>) {
  return (
    <CircularProgressFluentStyle
      style={{
        ...style
      }}
      width={width}
      height={height}
      color={color}
      duration={duration}
    >
      <svg
        {...rest}
        crossOrigin="anonymous"
        viewBox="25 25 50 50"
        className={`circular-progress-circle-fluent-svg ${className}`}
      >
        <circle
          className="circular-progress-circle-fluent"
          cx="50"
          cy="50"
          r="20"
        ></circle>
      </svg>
    </CircularProgressFluentStyle>
  );
}

const CircularProgressFluentStyle = styled.b<CircularProgressProps>`
  display: flex;
  .circular-progress-circle-fluent-svg {
    width: ${(props) =>
      typeof props.width === "number" ? `${props.width}px` : props.width};
    height: ${(props) =>
      props.height
        ? typeof props.height === "number"
          ? `${props.height}px`
          : props.height
        : typeof props.width === "number"
        ? `${props.width}px`
        : props.width};
    transform-origin: center;
    animation: circular-progress-rotate-1 ${(props) => props.duration} linear infinite;
  }

  .circular-progress-circle-fluent {
    fill: none;
    stroke: ${(props) => props.color};
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: circular-progress-fluent-dash
      calc(${(props) => props.duration} * 3) ease-in-out infinite;
  }

  @keyframes circular-progress-rotate-1 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes circular-progress-fluent-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
      stroke-width: 5;
    }
    100% {
      stroke-dashoffset: -123px;
    }
  }
`;