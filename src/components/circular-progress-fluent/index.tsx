import styled from "styled-components";

interface CircularProgressProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  duration?: string;
}

export function CircularProgressFluent({
  className = "",
  color = "#1d8c37",
  width = "50px",
  height = "50px",
  style,
  duration = "1s",
  ...rest
}: CircularProgressProps & React.SVGProps<SVGSVGElement>) {
  return (
    <CircularProgressFluentStyle
      style={{
        ...style,
        ["--width" as any]: width,
        ["--height" as any]: height,
        ["--color" as any]: color,
        ["--duration" as any]: duration,
      }}
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

const CircularProgressFluentStyle = styled.b`
  display: flex;
  .circular-progress-circle-fluent-svg {
    width: var(--width);
    height: var(--width);
    transform-origin: center;
    animation: circular-progress-rotate-1 var(--duration) linear infinite;
  }

  .circular-progress-circle-fluent {
    fill: none;
    stroke: var(--color);
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: circular-progress-fluent-dash calc(var(--duration) * 3)
      ease-in-out infinite;
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

export default CircularProgressFluent;
