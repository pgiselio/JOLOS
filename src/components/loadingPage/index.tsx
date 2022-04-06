import CircularProgressFluent from "../circular-progress-fluent";
import { LoadingPageStyle } from "./styles";

export function LoadingPage() {
  return (
    <LoadingPageStyle>
      <CircularProgressFluent
        color="var(--accent-color)"
        height="50px"
        width="50px"
      />
    </LoadingPageStyle>
  );
}
