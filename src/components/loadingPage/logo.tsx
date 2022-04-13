import CircularProgressFluent from "../circular-progress-fluent";
import { LoadingPageLogoStyle } from "./styles";

export function LoadingPageLogo({reason}: {reason?: string}) {
    return(
        <LoadingPageLogoStyle style={{height: "100vh"}}>
            <img src="/logo192.png" alt="logo"/>
            <CircularProgressFluent height="35px" width="35px" color="white"/>
            {reason && <p>{reason}</p>}
        </LoadingPageLogoStyle>
    );
}
